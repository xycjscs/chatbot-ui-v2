import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getCollectionById = async (collectionId: string) => {
  const fetchData = async () => {
    const { data: collection, error } = await supabase
      .from("collections")
      .select("*")
      .eq("id", collectionId)
      .single()

    if (!collection) {
      throw new Error(error.message)
    }

    return collection
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(`CollectionById-${collectionId}`, fetchData)
}

export const getCollectionWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const fetchData = async () => {
    const { data: workspace, error } = await supabase
      .from("workspaces")
      .select(
        `
      id,
      name,
      collections (*)
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
    `CollectionWorkspacesByWorkspaceId-${workspaceId}`,
    fetchData
  )
}

export const getCollectionWorkspacesByCollectionId = async (
  collectionId: string
) => {
  const fetchData = async () => {
    const { data: collection, error } = await supabase
      .from("collections")
      .select(
        `
      id, 
      name, 
      workspaces (*)
    `
      )
      .eq("id", collectionId)
      .single()

    if (!collection) {
      throw new Error(error.message)
    }

    return collection
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `CollectionWorkspacesByCollectionId-${collectionId}`,
    fetchData
  )
}

export const createCollection = async (
  collection: TablesInsert<"collections">,
  workspace_id: string
) => {
  const { data: createdCollection, error } = await supabase
    .from("collections")
    .insert([collection])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  await createCollectionWorkspace({
    user_id: createdCollection.user_id,
    collection_id: createdCollection.id,
    workspace_id
  })

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return createdCollection
}

export const createCollections = async (
  collections: TablesInsert<"collections">[],
  workspace_id: string
) => {
  const { data: createdCollections, error } = await supabase
    .from("collections")
    .insert(collections)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createCollectionWorkspaces(
    createdCollections.map(collection => ({
      user_id: collection.user_id,
      collection_id: collection.id,
      workspace_id
    }))
  )

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return createdCollections
}

export const createCollectionWorkspace = async (item: {
  user_id: string
  collection_id: string
  workspace_id: string
}) => {
  const { data: createdCollectionWorkspace, error } = await supabase
    .from("collection_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return createdCollectionWorkspace
}

export const createCollectionWorkspaces = async (
  items: { user_id: string; collection_id: string; workspace_id: string }[]
) => {
  const { data: createdCollectionWorkspaces, error } = await supabase
    .from("collection_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return createdCollectionWorkspaces
}

export const updateCollection = async (
  collectionId: string,
  collection: TablesUpdate<"collections">
) => {
  const { data: updatedCollection, error } = await supabase
    .from("collections")
    .update(collection)
    .eq("id", collectionId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return updatedCollection
}

export const deleteCollection = async (collectionId: string) => {
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collectionId)

  if (error) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return true
}

export const deleteCollectionWorkspace = async (
  collectionId: string,
  workspaceId: string
) => {
  const { error } = await supabase
    .from("collection_workspaces")
    .delete()
    .eq("collection_id", collectionId)
    .eq("workspace_id", workspaceId)

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("Collection")

  return true
}
