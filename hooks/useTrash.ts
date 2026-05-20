import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

export function useTrash() {
  const router = useRouter()
  const { user } = db.useAuth()

  const { data } = db.useQuery(
    user ? {
      desings: { $: { where: { userId: user.id, isDeleted: true } } },
    } : null
  )

  const trashedDesigns = data?.desings ?? []

  useEffect(() => {
    if (!trashedDesigns.length) return

    const expired = trashedDesigns.filter(
      (d) => d.deletedAt && Date.now() - d.deletedAt > THIRTY_DAYS_MS
    )

    if (!expired.length) return

    db.transact(expired.map((d) => db.tx.desings[d.id].delete()))
  }, [trashedDesigns])

  async function handleRestore(designId: string) {
    await db.transact(
      db.tx.desings[designId].update({ isDeleted: false, deletedAt: undefined })
    )
    router.push('/dashboard')
  }

  async function handlePermanentDelete(designId: string) {
    await db.transact(db.tx.desings[designId].delete())
  }

  return { trashedDesigns, handleRestore, handlePermanentDelete }
}
