import { LLM } from "@/types"

const Yi_PLATORM_LINK = "https://www.lingyiwanwu.com"

// Yi Models (UPDATED 01/13/24) -----------------------------

// Yi 34B (UPDATED 01/13/24)
const Yi_34B: LLM = {
  modelId: "yi-34b-chat",
  modelName: "Yi 34B 1123",
  provider: "yi",
  hostedId: "yi-34b-chat",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const Yi_34B_200k: LLM = {
  modelId: "yi-34b-chat-200k",
  modelName: "Yi 34B 200K",
  provider: "yi",
  hostedId: "yi-34b-chat-200k",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const Yi_34B_0205: LLM = {
  modelId: "yi-34b-chat-0205",
  modelName: "Yi 34B New",
  provider: "yi",
  hostedId: "yi-34b-chat-0205",
  platformLink: Yi_PLATORM_LINK,
  imageInput: false
}

const Yi_vl: LLM = {
  modelId: "yi-vl-plus",
  modelName: "Yi 视觉模型",
  provider: "yi",
  hostedId: "yi-vl-plus",
  platformLink: Yi_PLATORM_LINK,
  imageInput: true
}

export const Yi_LLM_LIST: LLM[] = [Yi_34B_0205, Yi_34B_200k, Yi_vl]
