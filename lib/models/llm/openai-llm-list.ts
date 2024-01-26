import { LLM } from "@/types"

const OPENAI_PLATORM_LINK = "https://platform.openai.com/docs/overview"

// OpenAI Models (UPDATED 1/25/24) -----------------------------

// GPT-4 Turbo (UPDATED 1/25/24)
const GPT4Turbo: LLM = {
  modelId: "gpt-4-turbo-preview",
  modelName: "GPT-4 Turbo",
  provider: "openai",
  hostedId: "gpt-4-turbo-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

// GPT-4 Vision (UPDATED 12/18/23)
const GPT4Vision: LLM = {
  modelId: "gpt-4-vision-preview",
  modelName: "GPT-4 Vision",
  provider: "openai",
  hostedId: "gpt-4-vision-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

// GPT-3.5 Turbo (UPDATED 1/25/24)
const GPT3_5Turbo: LLM = {
  modelId: "gpt-3.5-turbo-1106",
  modelName: "GPT-3.5 Turbo 16k",
  provider: "openai",
  hostedId: "gpt-3.5-turbo-1106",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

// GPT-3.5 Turbo (UPDATED 12/18/23)
const GPT3_5Turbo_0613: LLM = {
  modelId: "gpt-3.5-turbo-0613",
  modelName: "GPT-3.5 Turbo Smart",
  provider: "openai",
  hostedId: "gpt-3.5-turbo-0613",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

//export const OPENAI_LLM_LIST: LLM[] = [GPT3_5Turbo, GPT4Turbo, GPT4Vision]
export const OPENAI_LLM_LIST: LLM[] = [GPT3_5Turbo_0613, GPT3_5Turbo]
