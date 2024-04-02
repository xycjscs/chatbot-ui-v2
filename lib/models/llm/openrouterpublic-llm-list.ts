import { LLM } from "@/types"

const Yi_PLATORM_LINK = "https://Openrouter.com"

// Openrouter Models -----------------------------

// Openrouter
const Openrouter_haiku: LLM = {
  modelId: "anthropic/claude-3-haiku:beta",
  modelName: "Claude 3 Haiku",
  provider: "openrouterpublic",
  hostedId: "anthropic/claude-3-haiku:beta",
  platformLink: Yi_PLATORM_LINK,
  imageInput: true
}

export const Openrouterpublic_LLM_LIST: LLM[] = [Openrouter_haiku]
