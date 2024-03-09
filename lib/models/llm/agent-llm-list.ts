import { LLM } from "@/types"

const OPENAI_PLATORM_LINK = "https://platform.openai.com/docs/overview"

// OpenAI Models (UPDATED 1/25/24) -----------------------------

// Code_Interpreter
const Code_Interpreter: LLM = {
  modelId: "Code-Interpreter",
  modelName: "云计算",
  provider: "agent",
  hostedId: "Code-Interpreter",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

// 周易
const Zhouyi: LLM = {
  modelId: "Zhouyi",
  modelName: "周易",
  provider: "agent",
  hostedId: "Zhouyi",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

//export const OPENAI_LLM_LIST: LLM[] = [GPT3_5Turbo, GPT4Turbo, GPT4Vision]
export const Agent_LLM_LIST: LLM[] = [Code_Interpreter, Zhouyi]
