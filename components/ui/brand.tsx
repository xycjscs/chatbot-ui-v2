"use client"

import Link from "next/link"
import { FC } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <div
      className="flex justify-center text-4xl font-bold tracking-wide text-[rgb(0,0,0)]" //节日接口
    >
      MIML
    </div>
  )
}
