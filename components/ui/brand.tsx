"use client"

import Link from "next/link"
import { FC } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <div className="flex flex-col items-center justify-center font-bold tracking-wide">
      <div className="text-4xl">MIML</div>
      <div className="text-sm">感谢一直以来对MIML1.0项目的支持</div>
      <div className="text-sm">MIML1.0项目将于04/19日停止服务</div>
      <div className="text-sm">尽快前往miml.org注册使用MIML2.0</div>
      <div className="text-sm">付费用户余额联系公众号进行转移</div>
    </div>
  )
}
