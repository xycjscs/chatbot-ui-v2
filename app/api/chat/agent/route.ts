import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings, MessageImage } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { Images, ImageGenerateParams } from "openai/resources/images"
import { ChatbotUIContext } from "@/context/context"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, threadId } = json as {
    chatSettings: ChatSettings
    messages: any[]
    threadId: string | null
  }

  // 定义默认的imageSize值
  let agentsID:
    | "asst_eLb1PXg9C7fyIlFgWMdAVotf"
    | "asst_eLb1PXg9C7fyIlFgWMdAVotf"
    | "asst_eLb1PXg9C7fyIlFgWMdAVotf"
    | null
    | undefined = "asst_eLb1PXg9C7fyIlFgWMdAVotf"

  if (chatSettings.model == "Code-Interpreter") {
    agentsID = "asst_eLb1PXg9C7fyIlFgWMdAVotf"
  } else if (chatSettings.model == "Zhouyi") {
    agentsID = "asst_eLb1PXg9C7fyIlFgWMdAVotf"
  }

  try {
    // Create a thread if needed
    console.log(threadId)
    // Create a thread if needed
    let updatethreadId: string | null = threadId ?? "threadId-test-new"
    console.log(updatethreadId)
    // Add a message to the thread
    //const createdMessage = await openai.beta.threads.messages.create(threadId, {
    //  role: 'user',
    //  content: input.message,
    //});

    const profile = await getServerProfile()

    checkApiKey(profile.openai_api_key, "OpenAI")

    const openai = new OpenAI({
      apiKey: process.env.OPENAIAGENT_API_KEY,
      baseURL: process.env.OPENAI_PROXY || "https://api.openai.com/v1"
    })

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as ChatCompletionCreateParamsBase["messages"],
      temperature: chatSettings.temperature,
      stream: true
    })

    //const stream = OpenAIStream(response)

    //responseText是包装好了的回复。
    const responseText = "test123456798"

    const abc = new ReadableStream({
      start(controller) {
        controller.enqueue(responseText)
        controller.close()
      }
    })

    return new StreamingTextResponse(abc, {
      headers: updatethreadId ? { "x-thread-id": updatethreadId } : undefined
    })
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "OpenAI API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "OpenAI API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
