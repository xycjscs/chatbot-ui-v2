import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const body = JSON.stringify({
      model: chatSettings.model,
      messages: messages,
      temperature: chatSettings.temperature,
      stream: false
    })
    console.log(body)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/chat`,
      {
        method: "POST",
        body: body
      }
    )

    return response
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Ollama API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage =
        "Ollama API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
