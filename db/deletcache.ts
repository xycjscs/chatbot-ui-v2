// removeLocalStorageItemsByPrefix.ts

/**
 * 删除所有以指定前缀开头的localStorage项。
 * @param prefix 要删除项的键名前缀。
 */
export function removeLocalStorageItemsByPrefix(prefix: string): void {
  // 遍历所有localStorage项
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    if (key !== null && key.startsWith(prefix)) {
      // 删除匹配前缀的项
      localStorage.removeItem(key)
    }
  }
}
