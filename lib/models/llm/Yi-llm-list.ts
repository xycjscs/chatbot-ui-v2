import { LLM } from "@/types"

const Yi_PLATORM_LINK = "https://www.lingyiwanwu.com"

// Yi Models (UPDATED 01/13/24) -----------------------------

// Yi 34B (UPDATED 01/13/24)
const Yi_34B: LLM = {
  modelId: "yi-34b-chat",
  modelName: "Yi 34B 中国专家 [zh]",
  provider: "yi",
  hostedId: "yi-34b-chat",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

export const Yi_LLM_LIST: LLM[] = [Yi_34B]
