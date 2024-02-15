import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getAssistantFilesByAssistantId = async (assistantId: string) => {
  const fetchData = async () => {
    const { data: assistantFiles, error } = await supabase
      .from("assistants")
      .select(
        `
        id, 
        name, 
        files (*)
      `
      )
      .eq("id", assistantId)
      .single()

    if (!assistantFiles) {
      throw new Error(error.message)
    }

    return assistantFiles
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `AssistantFilesByAssistantId-${assistantId}`,
    fetchData
  )
}

export const createAssistantFile = async (
  assistantFile: TablesInsert<"assistant_files">
) => {
  const { data: createdAssistantFile, error } = await supabase
    .from("assistant_files")
    .insert(assistantFile)
    .select("*")

  if (!createdAssistantFile) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistantFile
}

export const createAssistantFiles = async (
  assistantFiles: TablesInsert<"assistant_files">[]
) => {
  const { data: createdAssistantFiles, error } = await supabase
    .from("assistant_files")
    .insert(assistantFiles)
    .select("*")

  if (!createdAssistantFiles) {
    throw new Error(error.message)
  }
  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistantFiles
}

export const deleteAssistantFile = async (
  assistantId: string,
  fileId: string
) => {
  const { error } = await supabase
    .from("assistant_files")
    .delete()
    .eq("assistant_id", assistantId)
    .eq("file_id", fileId)

  if (error) throw new Error(error.message)
  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return true
}
