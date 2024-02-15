import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getAssistantById = async (assistantId: string) => {
  const fetchData = async () => {
    const { data: assistant, error } = await supabase
      .from("assistants")
      .select("*")
      .eq("id", assistantId)
      .single()

    if (!assistant) {
      throw new Error(error.message)
    }

    return assistant
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`AssistantById-${assistantId}`, fetchData)
}

export const getAssistantWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const fetchData = async () => {
    const { data: workspace, error } = await supabase
      .from("workspaces")
      .select(
        `
      id,
      name,
      assistants (*)
    `
      )
      .eq("id", workspaceId)
      .single()

    if (!workspace) {
      throw new Error(error.message)
    }

    return workspace
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `AssistantWorkspacesByWorkspaceId-${workspaceId}`,
    fetchData
  )
}

export const getAssistantWorkspacesByAssistantId = async (
  assistantId: string
) => {
  const fetchData = async () => {
    const { data: assistant, error } = await supabase
      .from("assistants")
      .select(
        `
      id, 
      name, 
      workspaces (*)
    `
      )
      .eq("id", assistantId)
      .single()

    if (!assistant) {
      throw new Error(error.message)
    }

    return assistant
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `AssistantWorkspacesByAssistantId-${assistantId}`,
    fetchData
  )
}

export const createAssistant = async (
  assistant: TablesInsert<"assistants">,
  workspace_id: string
) => {
  const { data: createdAssistant, error } = await supabase
    .from("assistants")
    .insert([assistant])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  await createAssistantWorkspace({
    user_id: createdAssistant.user_id,
    assistant_id: createdAssistant.id,
    workspace_id
  })

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistant
}

export const createAssistants = async (
  assistants: TablesInsert<"assistants">[],
  workspace_id: string
) => {
  const { data: createdAssistants, error } = await supabase
    .from("assistants")
    .insert(assistants)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createAssistantWorkspaces(
    createdAssistants.map(assistant => ({
      user_id: assistant.user_id,
      assistant_id: assistant.id,
      workspace_id
    }))
  )

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistants
}

export const createAssistantWorkspace = async (item: {
  user_id: string
  assistant_id: string
  workspace_id: string
}) => {
  const { data: createdAssistantWorkspace, error } = await supabase
    .from("assistant_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistantWorkspace
}

export const createAssistantWorkspaces = async (
  items: { user_id: string; assistant_id: string; workspace_id: string }[]
) => {
  const { data: createdAssistantWorkspaces, error } = await supabase
    .from("assistant_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return createdAssistantWorkspaces
}

export const updateAssistant = async (
  assistantId: string,
  assistant: TablesUpdate<"assistants">
) => {
  const { data: updatedAssistant, error } = await supabase
    .from("assistants")
    .update(assistant)
    .eq("id", assistantId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return updatedAssistant
}

export const deleteAssistant = async (assistantId: string) => {
  const { error } = await supabase
    .from("assistants")
    .delete()
    .eq("id", assistantId)

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return true
}

export const deleteAssistantWorkspace = async (
  assistantId: string,
  workspaceId: string
) => {
  const { error } = await supabase
    .from("assistant_workspaces")
    .delete()
    .eq("assistant_id", assistantId)
    .eq("workspace_id", workspaceId)

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Assistant")

  return true
}
