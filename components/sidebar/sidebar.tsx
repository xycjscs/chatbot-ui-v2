import { ChatbotUIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/types"
import { FC, useContext } from "react"
import { SIDEBAR_WIDTH } from "../ui/dashboard"
import { TabsContent } from "../ui/tabs"
import { WorkspaceSwitcher } from "../utility/workspace-switcher"
import { WorkspaceSettings } from "../workspace/workspace-settings"
import { SidebarContent } from "./sidebar-content"

interface SidebarProps {
  contentType: ContentType
  showSidebar: boolean
}

export const Sidebar: FC<SidebarProps> = ({ contentType, showSidebar }) => {
  const { folders, chats, presets, prompts, files, collections, assistants } =
    useContext(ChatbotUIContext)

  const chatFolders = folders.filter(folder => folder.type === "chats")
  const presetFolders = folders.filter(folder => folder.type === "presets")
  const promptFolders = folders.filter(folder => folder.type === "prompts")
  const filesFolders = folders.filter(folder => folder.type === "files")
  const collectionFolders = folders.filter(
    folder => folder.type === "collection"
  )
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )

  const renderSidebarContent = (
    contentType: ContentType,
    data: any[],
    folders: Tables<"folders">[]
  ) => {
    return (
      <SidebarContent contentType={contentType} data={data} folders={folders} />
    )
  }

  return (
    <TabsContent
      className="m-0 w-full space-y-2"
      style={{
        // Sidebar - SidebarSwitcher
        minWidth: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 40px)` : "0px",
        maxWidth: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 40px)` : "0px",
        width: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 40px)` : "0px"
      }}
      value={contentType}
    >
      <div className="flex h-full flex-col p-1">
        <div className="flex items-center border-b-2 pb-2">
          <WorkspaceSwitcher />

          <WorkspaceSettings />
        </div>

        {(() => {
          switch (contentType) {
            case "chats":
              return renderSidebarContent("chats", chats, chatFolders)

            case "presets":
              return renderSidebarContent("presets", presets, presetFolders)

            case "prompts":
              return renderSidebarContent("prompts", prompts, promptFolders)

            case "files":
              return renderSidebarContent("files", files, filesFolders)

            case "collections":
              return renderSidebarContent(
                "collections",
                collections,
                collectionFolders
              )

            case "assistants":
              return renderSidebarContent(
                "assistants",
                assistants,
                assistantFolders
              )

            default:
              return null
          }
        })()}
      </div>
    </TabsContent>
  )
}
