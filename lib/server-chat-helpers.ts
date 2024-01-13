import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// 创建一个简单的缓存对象
const profileCache = new Map<string, any>()

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
  const cachedProfile = profileCache.get(user.id)
  if (cachedProfile) {
    return cachedProfile // 如果缓存存在，直接返回缓存中的档案
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!profile) {
    throw new Error("Profile not found")
  }

  // 更新缓存
  profileCache.set(user.id, profile)

  return profile
}

export function checkApiKey(apiKey: string | null, keyName: string) {
  if (apiKey === null || apiKey === "") {
    throw new Error(`${keyName} API Key not found`)
  }
}
