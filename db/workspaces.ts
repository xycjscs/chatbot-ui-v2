import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getHomeWorkspaceByUserId = async (userId: string) => {
  const fetchData = async () => {
    const { data: homeWorkspace, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", userId)
      .eq("is_home", true)
      .single()

    if (!homeWorkspace) {
      throw new Error(error.message)
    }

    return homeWorkspace.id
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`HomeWorkspaceByUserId-${userId}`, fetchData)
}

export const getWorkspaceById = async (workspaceId: string) => {
  const fetchData = async () => {
    const { data: workspace, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("id", workspaceId)
      .single()

    if (!workspace) {
      throw new Error(error.message)
    }

    return workspace
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`WorkspaceById-${workspaceId}`, fetchData)
}

export const getWorkspacesByUserId = async (userId: string) => {
  const fetchData = async () => {
    const { data: workspaces, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (!workspaces) {
      throw new Error(error.message)
    }

    return workspaces
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`WorkspacesByUserId-${userId}`, fetchData)
}

export const createWorkspace = async (
  workspace: TablesInsert<"workspaces">
) => {
  const { data: createdWorkspace, error } = await supabase
    .from("workspaces")
    .insert([workspace])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Workspace")

  return createdWorkspace
}

export const updateWorkspace = async (
  workspaceId: string,
  workspace: TablesUpdate<"workspaces">
) => {
  const { data: updatedWorkspace, error } = await supabase
    .from("workspaces")
    .update(workspace)
    .eq("id", workspaceId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Workspace")

  return updatedWorkspace
}

export const deleteWorkspace = async (workspaceId: string) => {
  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspaceId)

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Workspace")

  return true
}
