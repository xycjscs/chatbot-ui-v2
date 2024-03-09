import { cn } from "@/lib/utils"
import mistral from "@/public/providers/mistral.png"
import deepseek from "@/public/providers/deepseek.webp"
import ai01 from "@/public/providers/01ai.png"
import meta from "@/public/providers/meta.png"
import perplexity from "@/public/providers/perplexity.png"
import { ModelProvider } from "@/types"
import { IconSparkles } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "../icons/anthropic-svg"
import { GoogleSVG } from "../icons/google-svg"
import { OpenAISVG } from "../icons/openai-svg"
import zhipu from "@/public/providers/zhipu.png"
import ollama from "@/public/providers/ollama.png"
import { OllamaSVG } from "../icons/ollama-svg"
import { OpenrouterSVG } from "../icons/openrouter-svg"
import agent from "@/public/favicon.png"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: ModelProvider
  height: number
  width: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as ModelProvider) {
    case "openai":
      return (
        <OpenAISVG
          className={cn(
            "rounded-sm bg-[#fff] p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "mistral":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={mistral.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    case "yi":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={ai01.src}
          alt="yi"
          width={width}
          height={height}
        />
      )
    case "deepseek":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={deepseek.src}
          alt="Deepseek"
          width={width}
          height={height}
        />
      )
    case "agent":
      return (
        <Image
          className={cn(
            "rounded-sm",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={agent.src}
          alt="yi"
          width={width}
          height={height}
        />
      )
    case "ollama":
      return (
        <OllamaSVG
          className={cn(
            "rounded-sm bg-[#fff] p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "openrouter":
      return (
        <OpenrouterSVG
          className={cn(
            "rounded-sm bg-[#fff] p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "zhipu":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={zhipu.src}
          alt="Zhipu"
          width={width}
          height={height}
        />
      )
    case "anthropic":
      return (
        <AnthropicSVG
          className={cn(
            "rounded-sm bg-[#fff] p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "google":
      return (
        <GoogleSVG
          className={cn(
            "rounded-sm bg-[#fff] p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "perplexity":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-[1px] border-black"
          )}
          src={perplexity.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    default:
      return <IconSparkles size={width} />
  }
}
