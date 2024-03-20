import { LLM } from "@/types"

const Yi_PLATORM_LINK = "https://www.lingyiwanwu.com"

// Yi Models (UPDATED 01/13/24) -----------------------------

// Yi 34B (UPDATED 01/13/24)
const llava_16_34: LLM = {
  modelId: "llava-vision",
  modelName: "LLAVA视觉模型",
  provider: "miml",
  hostedId: "llava-vision",
  platformLink: Yi_PLATORM_LINK,
  imageInput: true
}

const qwen_15_14: LLM = {
  modelId: "通义千问14B",
  modelName: "通义千问-32K",
  provider: "miml",
  hostedId: "通义千问14B",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const gemma: LLM = {
  modelId: "gemma",
  modelName: "谷歌Gemma",
  provider: "miml",
  hostedId: "gemma",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const neural: LLM = {
  modelId: "neural",
  modelName: "英特尔Neural",
  provider: "miml",
  hostedId: "neural",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

export const Miml_LLM_LIST: LLM[] = [qwen_15_14, gemma, neural]
