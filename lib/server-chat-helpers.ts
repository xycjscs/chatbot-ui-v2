import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// 创建一个简单的缓存对象
const profileCache = new Map<string, { profile: any; timestamp: number }>()
const CACHE_EXPIRATION_TIME = 2 * 3600 * 1000 // 缓存过期时间，单位为毫秒（这里设置为1小时）

export async function getServerProfile() {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const user = (await supabase.auth.getUser()).data.user
  if (!user) {
    throw new Error("User not found")
  }

  // 检查缓存
  const cachedProfileData = profileCache.get(user.id)

  // 如果缓存存在且未过期，直接返回缓存中的档案
  if (
    cachedProfileData &&
    Date.now() - cachedProfileData.timestamp < CACHE_EXPIRATION_TIME
  ) {
    return cachedProfileData.profile
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!profile) {
    throw new Error("Profile not found")
  }

  // 更新缓存并记录时间戳
  profileCache.set(user.id, { profile, timestamp: Date.now() })

  return profile
}

export function checkApiKey(apiKey: string | null, keyName: string) {
  if (apiKey === null || apiKey === "") {
    throw new Error(`${keyName} API Key not found`)
  }
}
