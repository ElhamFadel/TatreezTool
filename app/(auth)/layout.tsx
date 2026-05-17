'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import db from '@/lib/db'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isLoading, user } = db.useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (user) router.replace('/dashboard')
  }, [isLoading, user, router])

  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F4]">
        <div className="w-6 h-6 border-2 border-[#E85D75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
