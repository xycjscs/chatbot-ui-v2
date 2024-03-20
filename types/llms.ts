import { ModelProvider } from "."

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | YiLLMID
  | DeepseekLLMID
  | ZhipuLLMID
  | MIMLLLMID

// OpenAI Models (UPDATED 1/29/24)
export type OpenAILLMID =
  | "gpt-4-turbo-preview" // GPT-4 Turbo
  | "gpt-4-vision-preview" // GPT-4 Vision
  | "gpt-3.5-turbo-0613" // Updated GPT-3.5 Turbo
  | "gpt-3.5-turbo-1106" // Updated GPT-3.5 Turbo
  | "gpt-4" // GPT-4
  | "gpt-3.5-turbo" // Updated GPT-3.5 Turbo
  | "gpt-3.5-turbo-0125"
  | "gpt-3.5-turbo-16k-0613"

// Google Models
export type GoogleLLMID =
  | "gemini-pro" // Gemini Pro
  | "gemini-pro-vision" // Gemini Pro Vision

// Anthropic Models
export type AnthropicLLMID =
  | "claude-2.1" // Claude 2
  | "claude-instant-1.2" // Claude Instant
  | "claude-3-sonnet-20240229" // Claude 3 Sonnet
  | "claude-3-opus-20240229" // Claude 3 Opus

// Mistral Models
export type MistralLLMID =
  | "mistral-tiny" // Mistral Tiny
  | "mistral-small" // Mistral Small
  | "mistral-medium" // Mistral Medium
  | "mistral-large-latest" // Mistral large

export type GroqLLMID =
  | "llama2-70b-4096" // LLaMA2-70b
  | "mixtral-8x7b-32768" // Mixtral-8x7b

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | "pplx-7b-online" // Perplexity Online 7B
  | "pplx-70b-online" // Perplexity Online 70B
  | "pplx-7b-chat" // Perplexity Chat 7B
  | "pplx-70b-chat" // Perplexity Chat 70B
  | "mixtral-8x7b-instruct" // Mixtral 8x7B Instruct
  | "mistral-7b-instruct" // Mistral 7B Instruct
  | "llama-2-70b-chat" // Llama2 70B Chat
  | "codellama-34b-instruct" // CodeLlama 34B Instruct
  | "codellama-70b-instruct" // CodeLlama 70B Instruct
  | "sonar-small-chat" // Sonar Small Chat
  | "sonar-small-online" // Sonar Small Online
  | "sonar-medium-chat" // Sonar Medium Chat
  | "sonar-medium-online" // Sonar Medium Online

// Yi Models
export type YiLLMID =
  | "yi-34b-chat" // Yi 34B
  | "yi-34b-chat-200k" // Yi 34B 200k
  | "yi-34b-chat-0205" // Yi 34B 0205
  | "yi-vl-plus" //视觉模型

// deepseek Models
export type DeepseekLLMID =
  | "deepseek-coder" // deepseek-coder
  | "deepseek-chat" // deepseek-coder

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  hostedId: string
  platformLink: string
  imageInput: boolean
}

export interface OpenRouterLLM extends LLM {
  maxContext: number
}

// Zhipu Models
export type ZhipuLLMID =
  | "glm-4" // GLM-4
  | "glm-4v" // GLM-4 Vision
  | "glm-3-turbo" // GLM-3 Turbo

// Yi Models
export type MIMLLLMID =
  | "llava-vision" //
  | "通义千问14B" //
  | "gemma"
  | "neural"
