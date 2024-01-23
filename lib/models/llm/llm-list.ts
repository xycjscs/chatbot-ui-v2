import { LLM } from "@/types"
import { ANTHROPIC_LLM_LIST } from "./anthropic-llm-list"
import { GOOGLE_LLM_LIST } from "./google-llm-list"
import { MISTRAL_LLM_LIST } from "./mistral-llm-list"
import { OPENAI_LLM_LIST } from "./openai-llm-list"
import { PERPLEXITY_LLM_LIST } from "./perplexity-llm-list"

import { Yi_LLM_LIST } from "./Yi-llm-list"
import { Deepseek_LLM_LIST } from "./deepseek-llm-list"

export const LLM_LIST: LLM[] = [
  ...OPENAI_LLM_LIST,
  ...MISTRAL_LLM_LIST,
  ...Deepseek_LLM_LIST,
  ...Yi_LLM_LIST

  //...GOOGLE_LLM_LIST,
  // ...LLAMA_LLM_LIST,
  //...PERPLEXITY_LLM_LIST,
  //...ANTHROPIC_LLM_LIST
]
