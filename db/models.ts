import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getModelById = async (modelId: string) => {
  const fetchData = async () => {
    const { data: model, error } = await supabase
      .from("models")
      .select("*")
      .eq("id", modelId)
      .single()

    if (!model) {
      throw new Error(error.message)
    }

    return model
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`ModelById-${modelId}`, fetchData)
}

export const getModelWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const fetchData = async () => {
    const { data: workspace, error } = await supabase
      .from("workspaces")
      .select(
        `
      id,
      name,
      models (*)
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
    `ModelWorkspacesByWorkspaceId-${workspaceId}`,
    fetchData
  )
}

export const getModelWorkspacesByModelId = async (modelId: string) => {
  const fetchData = async () => {
    const { data: model, error } = await supabase
      .from("models")
      .select(
        `
      id, 
      name, 
      workspaces (*)
    `
      )
      .eq("id", modelId)
      .single()

    if (!model) {
      throw new Error(error.message)
    }

    return model
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `ModelWorkspacesByModelId-${modelId}`,
    fetchData
  )
}

export const createModel = async (
  model: TablesInsert<"models">,
  workspace_id: string
) => {
  const { data: createdModel, error } = await supabase
    .from("models")
    .insert([model])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  await createModelWorkspace({
    user_id: model.user_id,
    model_id: createdModel.id,
    workspace_id: workspace_id
  })

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return createdModel
}

export const createModels = async (
  models: TablesInsert<"models">[],
  workspace_id: string
) => {
  const { data: createdModels, error } = await supabase
    .from("models")
    .insert(models)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createModelWorkspaces(
    createdModels.map(model => ({
      user_id: model.user_id,
      model_id: model.id,
      workspace_id
    }))
  )

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return createdModels
}

export const createModelWorkspace = async (item: {
  user_id: string
  model_id: string
  workspace_id: string
}) => {
  const { data: createdModelWorkspace, error } = await supabase
    .from("model_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return createdModelWorkspace
}

export const createModelWorkspaces = async (
  items: { user_id: string; model_id: string; workspace_id: string }[]
) => {
  const { data: createdModelWorkspaces, error } = await supabase
    .from("model_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return createdModelWorkspaces
}

export const updateModel = async (
  modelId: string,
  model: TablesUpdate<"models">
) => {
  const { data: updatedModel, error } = await supabase
    .from("models")
    .update(model)
    .eq("id", modelId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return updatedModel
}

export const deleteModel = async (modelId: string) => {
  const { error } = await supabase.from("models").delete().eq("id", modelId)

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return true
}

export const deleteModelWorkspace = async (
  modelId: string,
  workspaceId: string
) => {
  const { error } = await supabase
    .from("model_workspaces")
    .delete()
    .eq("model_id", modelId)
    .eq("workspace_id", workspaceId)

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Model")

  return true
}
