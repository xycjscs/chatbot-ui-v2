import { Tables } from "@/supabase/types"
import { LLM, LLMID, OpenRouterLLM } from "@/types"
import { toast } from "sonner"
import { LLM_LIST_MAP } from "./llm/llm-list"

export const fetchHostedModels = async (profile: Tables<"profiles">) => {
  try {
    const providers = [
      "openrouterpublic",
      "openai",
      //"miml",
      "yi",
      "google",
      "azure",
      "anthropic",
      "mistral",
      "perplexity",
      "deepseek",
      "groq"
      //这里用来模型排序
    ]

    if (profile.use_azure_openai) {
      providers.push("azure")
    } //else {
    //providers.push("openai")
    //}

    const response = await fetch("/api/keys")

    if (!response.ok) {
      throw new Error(`Server is not responding.`)
    }

    const data = await response.json()

    let modelsToAdd: LLM[] = []

    for (const provider of providers) {
      let providerKey: keyof typeof profile

      if (provider === "google") {
        providerKey = "google_gemini_api_key"
      } else if (provider === "azure") {
        providerKey = "azure_openai_api_key"
      } else {
        providerKey = `${provider}_api_key` as keyof typeof profile
      }

      if (profile?.[providerKey] || data.isUsingEnvKeyMap[provider]) {
        const models = LLM_LIST_MAP[provider]

        if (Array.isArray(models)) {
          modelsToAdd.push(...models)
        }
      }
    }

    return {
      envKeyMap: data.isUsingEnvKeyMap,
      hostedModels: modelsToAdd
    }
  } catch (error) {
    console.warn("Error fetching hosted models: " + error)
  }
}

export const fetchOllamaModels = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OLLAMA_URL + "/api/tags"
    )

    if (!response.ok) {
      throw new Error(`Ollama server is not responding.`)
    }

    const data = await response.json()

    const localModels: LLM[] = data.models.map((model: any) => ({
      modelId: model.name as LLMID,
      modelName: model.name,
      provider: "ollama",
      hostedId: model.name,
      platformLink: "https://ollama.ai/library",
      imageInput: model.name.includes("vision") || model.name.includes("视觉")
    }))

    return localModels
  } catch (error) {
    console.warn("Error fetching Ollama models: " + error)
  }
}

export const fetchOpenRouterModels = async () => {
  try {
    const cachedData = localStorage.getItem("openRouterModelsCache")
    const now = new Date()

    if (cachedData) {
      const { data: cachedModels, timestamp } = JSON.parse(cachedData)

      // 检查缓存是否已经超过24小时
      if (now.getTime() - timestamp < 24 * 60 * 60 * 1000) {
        return cachedModels // 返回缓存的数据
      }
    }

    const response = await fetch("https://openrouter.ai/api/v1/models")

    if (!response.ok) {
      throw new Error(`OpenRouter server is not responding.`)
    }

    const { data } = await response.json()

    const openRouterModels = data.map(
      (model: {
        id: string
        name: string
        context_length: number
      }): OpenRouterLLM => ({
        modelId: model.id as LLMID,
        modelName: model.id,
        provider: "openrouter",
        hostedId: model.name,
        platformLink: "https://openrouter.dev",
        imageInput:
          model.id.includes("vision") ||
          model.id.includes("视觉") ||
          model.id.includes("claude-3"),
        maxContext: model.context_length
      })
    )

    // 更新缓存
    localStorage.setItem(
      "openRouterModelsCache",
      JSON.stringify({ data: openRouterModels, timestamp: now.getTime() })
    )

    return openRouterModels
  } catch (error) {
    console.error("Error fetching Open Router models: " + error)
    toast.error("Error fetching Open Router models: " + error)
  }
}
