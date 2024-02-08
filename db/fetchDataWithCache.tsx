// 定义一个用于获取数据并缓存的通用函数
async function FetchDataWithCache<T>(
  key: string,
  fetchFunction: () => Promise<T>
): Promise<T> {
  // 尝试从localStorage中获取数据
  const cachedData = localStorage.getItem(key)
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData)
    const now = new Date().getTime()

    // 检查数据是否在1小时内
    if (now - timestamp < 1 * 60 * 60 * 1000) {
      return data // 返回缓存的数据
    }
  }

  // 如果缓存不存在或过期，则从服务器获取数据
  const newData = await fetchFunction()
  // 将数据连同当前时间戳一起保存到localStorage
  localStorage.setItem(
    key,
    JSON.stringify({ data: newData, timestamp: new Date().getTime() })
  )
  return newData
}

// Export the function so it can be imported in other files
export { FetchDataWithCache }
