'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'

export default function RootPage() {
  const { isLoading, user } = db.useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (user) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [isLoading, user, router])

  return null
}
