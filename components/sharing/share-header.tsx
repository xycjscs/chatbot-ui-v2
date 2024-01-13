import { Session } from "@supabase/supabase-js"
import Link from "next/link"
import { FC } from "react"
import { Button } from "../ui/button"

interface ShareHeaderProps {
  session: Session
}

export const ShareHeader: FC<ShareHeaderProps> = ({ session }) => {
  return (
    <div className="flex justify-between">
      <Link
        href="https://www.miml.com"
        className="text-2xl font-bold hover:opacity-50"
      >
        Molecular Imaging Machine Learning
      </Link>

      <Link href={session ? "/chat" : "/login"}>
        <Button size="sm">{session ? "App" : "Sign Up"}</Button>
      </Link>
    </div>
  )
}
