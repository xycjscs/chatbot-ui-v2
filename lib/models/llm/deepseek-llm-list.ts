import { LLM } from "@/types"

const Deepseek_PLATORM_LINK = "https://platform.deepseek.com/docs"

// deepseek Models (UPDATED 01/13/24) -----------------------------

// deepseek-coder (UPDATED 01/13/24)
const Deepseek_coder: LLM = {
  modelId: "deepseek-coder",
  modelName: "Deepseek 自动编程",
  provider: "deepseek",
  hostedId: "deepseek-coder",
  platformLink: Deepseek_PLATORM_LINK,
  imageInput: false
}

// deepseek-chat (UPDATED 01/13/24)
const Deepseek_chat: LLM = {
  modelId: "deepseek-chat",
  modelName: "Deepseek chat",
  provider: "deepseek",
  hostedId: "deepseek-chat",
  platformLink: Deepseek_PLATORM_LINK,
  imageInput: false
}

export const Deepseek_LLM_LIST: LLM[] = [Deepseek_coder, Deepseek_chat]
