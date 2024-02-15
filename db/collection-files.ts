import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert } from "@/supabase/types"
import { removeLocalStorageItemsByPrefix } from "./deletcache"
import { FetchDataWithCache } from "./fetchDataWithCache"

export const getCollectionFilesByCollectionId = async (
  collectionId: string
) => {
  const fetchData = async () => {
    const { data: collectionFiles, error } = await supabase
      .from("collections")
      .select(
        `
        id, 
        name, 
        files ( id, name, type )
      `
      )
      .eq("id", collectionId)
      .single()

    if (!collectionFiles) {
      throw new Error(error.message)
    }

    return collectionFiles
  }
  // Use the FetchDataWithCache function to get workspace data, either from cache or the server
  return await FetchDataWithCache(
    `CollectionFilesByCollectionId-${collectionId}`,
    fetchData
  )
}

export const createCollectionFile = async (
  collectionFile: TablesInsert<"collection_files">
) => {
  const { data: createdCollectionFile, error } = await supabase
    .from("collection_files")
    .insert(collectionFile)
    .select("*")

  if (!createdCollectionFile) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("CollectionFiles")

  return createdCollectionFile
}

export const createCollectionFiles = async (
  collectionFiles: TablesInsert<"collection_files">[]
) => {
  const { data: createdCollectionFiles, error } = await supabase
    .from("collection_files")
    .insert(collectionFiles)
    .select("*")

  if (!createdCollectionFiles) {
    throw new Error(error.message)
  }

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("CollectionFiles")

  return createdCollectionFiles
}

export const deleteCollectionFile = async (
  collectionId: string,
  fileId: string
) => {
  const { error } = await supabase
    .from("collection_files")
    .delete()
    .eq("collection_id", collectionId)
    .eq("file_id", fileId)

  if (error) throw new Error(error.message)

  // 更新成功后，清除本地缓存
  removeLocalStorageItemsByPrefix("CollectionFiles")

  return true
}
