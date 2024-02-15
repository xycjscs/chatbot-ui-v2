import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getPresetById = async (presetId: string) => {
  const fetchData = async () => {
    const { data: preset, error } = await supabase
      .from("presets")
      .select("*")
      .eq("id", presetId)
      .single()

    if (!preset) {
      throw new Error(error.message)
    }

    return preset
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`PresetById-${presetId}`, fetchData)
}

export const getPresetWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const fetchData = async () => {
    const { data: workspace, error } = await supabase
      .from("workspaces")
      .select(
        `
      id,
      name,
      presets (*)
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
    `PresetWorkspacesByWorkspaceId-${workspaceId}`,
    fetchData
  )
}

export const getPresetWorkspacesByPresetId = async (presetId: string) => {
  const fetchData = async () => {
    const { data: preset, error } = await supabase
      .from("presets")
      .select(
        `
      id, 
      name, 
      workspaces (*)
    `
      )
      .eq("id", presetId)
      .single()

    if (!preset) {
      throw new Error(error.message)
    }

    return preset
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `PresetWorkspacesByPresetId-${presetId}`,
    fetchData
  )
}

export const createPreset = async (
  preset: TablesInsert<"presets">,
  workspace_id: string
) => {
  const { data: createdPreset, error } = await supabase
    .from("presets")
    .insert([preset])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  await createPresetWorkspace({
    user_id: preset.user_id,
    preset_id: createdPreset.id,
    workspace_id: workspace_id
  })

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return createdPreset
}

export const createPresets = async (
  presets: TablesInsert<"presets">[],
  workspace_id: string
) => {
  const { data: createdPresets, error } = await supabase
    .from("presets")
    .insert(presets)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createPresetWorkspaces(
    createdPresets.map(preset => ({
      user_id: preset.user_id,
      preset_id: preset.id,
      workspace_id
    }))
  )
  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("presetData")

  return createdPresets
}

export const createPresetWorkspace = async (item: {
  user_id: string
  preset_id: string
  workspace_id: string
}) => {
  const { data: createdPresetWorkspace, error } = await supabase
    .from("preset_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return createdPresetWorkspace
}

export const createPresetWorkspaces = async (
  items: { user_id: string; preset_id: string; workspace_id: string }[]
) => {
  const { data: createdPresetWorkspaces, error } = await supabase
    .from("preset_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return createdPresetWorkspaces
}

export const updatePreset = async (
  presetId: string,
  preset: TablesUpdate<"presets">
) => {
  const { data: updatedPreset, error } = await supabase
    .from("presets")
    .update(preset)
    .eq("id", presetId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return updatedPreset
}

export const deletePreset = async (presetId: string) => {
  const { error } = await supabase.from("presets").delete().eq("id", presetId)

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return true
}

export const deletePresetWorkspace = async (
  presetId: string,
  workspaceId: string
) => {
  const { error } = await supabase
    .from("preset_workspaces")
    .delete()
    .eq("preset_id", presetId)
    .eq("workspace_id", workspaceId)

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Preset")

  return true
}
