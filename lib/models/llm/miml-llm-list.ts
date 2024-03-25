import { LLM } from "@/types"

const Yi_PLATORM_LINK = "https://www.lingyiwanwu.com"

// Yi Models (UPDATED 01/13/24) -----------------------------

// Yi 34B (UPDATED 01/13/24)
const llava_16_34: LLM = {
  modelId: "Yi视觉模型llava",
  modelName: "Yi视觉模型",
  provider: "miml",
  hostedId: "Yi视觉模型llava",
  platformLink: Yi_PLATORM_LINK,
  imageInput: true
}

const qwen_15_14: LLM = {
  modelId: "通义千问32K",
  modelName: "通义千问-32K",
  provider: "miml",
  hostedId: "通义千问32K",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const gemma: LLM = {
  modelId: "谷歌Gemma",
  modelName: "谷歌Gemma",
  provider: "miml",
  hostedId: "谷歌Gemma",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const neural: LLM = {
  modelId: "英特尔Neural",
  modelName: "英特尔Neural",
  provider: "miml",
  hostedId: "英特尔Neural",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

export const Miml_LLM_LIST: LLM[] = [qwen_15_14, gemma, neural, llava_16_34]
