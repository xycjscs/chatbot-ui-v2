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
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  const latestMessage = messages[messages.length - 1].content

  if (latestMessage.startsWith("生成图片")) {
    try {
      const profile = await getServerProfile()

      checkApiKey(profile.openai_api_key, "OpenAI")

      const openai = new OpenAI({
        apiKey: profile.openai_api_key || "",
        organization: profile.openai_organization_id,
        baseURL: process.env.OPENAI_PROXY || "https://api.openai.com/v1"
      })

      const cleanedMessage = latestMessage.replace("生成图片", "").trim()

      // 定义默认的imageSize值
      let imageSize:
        | "1024x1024"
        | "1792x1024"
        | "1024x1792"
        | null
        | undefined = "1024x1024"

      // 检查cleanedMessage是否包含特定的关键字以调整图片尺寸
      if (cleanedMessage.includes("横") || cleanedMessage.includes("水平")) {
        imageSize = "1792x1024"
      } else if (cleanedMessage.includes("竖")) {
        imageSize = "1024x1792"
      }

      // 默认的质量值
      let imagequality: "hd" | "standard" | null | undefined = "standard"

      // 检查cleanedMessage是否包含特定的关键字以调整图片质量
      if (cleanedMessage.includes("质量")) {
        imagequality = "hd"
      }

      // Todo CHO20240112: Get those image generation parameters from the UI settings
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: cleanedMessage,
        n: 1,
        quality: imagequality,
        size: imageSize
      })

      return new Response(
        "提示词：" +
          response.data[0].revised_prompt +
          " \
      " +
          "![Image](" +
          response.data[0].url +
          ")",
        {
          status: 200
        }
      )
    } catch (error: any) {
      const errorMessage =
        error.error?.message || "An unexpected error occurred"
      const errorCode = error.status || 500
      return new Response(JSON.stringify({ message: errorMessage }), {
        status: errorCode
      })
    }
  } else {
    try {
      const profile = await getServerProfile()

      checkApiKey(profile.openai_api_key, "OpenAI")

      const openai = new OpenAI({
        apiKey: profile.openai_api_key || "",
        baseURL: process.env.OPENAI_PROXY || "https://api.openai.com/v1"
      })

      console.log(profile.openai_api_key)

      const response = await openai.chat.completions.create({
        model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
        messages: messages as ChatCompletionCreateParamsBase["messages"],
        temperature: chatSettings.temperature,
        max_tokens: chatSettings.model === "gpt-4-vision-preview" ? 4096 : null, // TODO: Fix
        stream: true
      })

      const stream = OpenAIStream(response)

      return new StreamingTextResponse(stream)
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
}
