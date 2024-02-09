"use client"

import { ChatHelp } from "@/components/chat/chat-help"
import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatSettings } from "@/components/chat/chat-settings"
//import { ChatUI } from "@/components/chat/chat-ui"
import { QuickSettings } from "@/components/chat/quick-settings"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import useHotkey from "@/lib/hooks/use-hotkey"
import { useTheme } from "next-themes"
import { useContext } from "react"
import Image from "next/image"

import React, { lazy, Suspense } from "react"
const ChatUI = lazy(() =>
  import("@/components/chat/chat-ui").then(module => ({
    default: module.ChatUI
  }))
)

export default function ChatPage() {
  useHotkey("o", () => handleNewChat())
  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const { chatMessages } = useContext(ChatbotUIContext)

  const { handleNewChat, handleFocusChatInput } = useChatHandler()

  const { theme } = useTheme()

  return (
    <>
      {chatMessages.length === 0 ? (
        <div className=" relative flex h-full flex-col items-center justify-center bg-[url('/dragon.webp')] bg-cover bg-center">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20">
            <Brand theme={theme === "dark" ? "dark" : "light"} />
            {/* 插入图片 */}
            {/*<div className="flex justify-center">
              <Image
                src="/wechat-mini.jpg" // 图片路径
                alt="WeChat" // 图片描述
                width={100} // 图片宽度
                height={100} // 图片高度
              />
          </div>*/}
          </div>

          <div className="absolute left-2 top-2">
            <QuickSettings />
          </div>

          <div className="absolute right-2 top-2">
            <ChatSettings />
          </div>

          <div className="flex grow flex-col items-center justify-center" />

          <div className="w-full px-2 pb-8">
            <ChatInput />
          </div>

          {/*<div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
            <ChatHelp />
      </div>*/}
        </div>
      ) : (
        <Suspense
          fallback={<div className="flex justify-center">Loading...</div>}
        >
          <ChatUI />
        </Suspense>
      )}
    </>
  )
}
