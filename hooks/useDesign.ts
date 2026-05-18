import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useDesign(designId: string) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearStatusRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initializedRef = useRef(false)

  const { user } = db.useAuth()

  const { data, isLoading: queryLoading } = db.useQuery({
    desings: { $: { where: { id: designId } } },
  })

  const design = data?.desings?.[0] ?? null

  useEffect(() => {
    if (queryLoading) return
    if (!design || design.userId !== user?.id) router.push('/dashboard')
  }, [design, queryLoading, user?.id, router])

  useEffect(() => {
    if (design && !initializedRef.current) {
      setName(design.designName)
      initializedRef.current = true
    }
  }, [design])

  function handleNameChange(value: string) {
    setName(value)
    setSaveStatus('saving')

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      if (!design) return

      if (value.trim() === '') {
        setName(design.designName)
        setSaveStatus('idle')
        return
      }

      try {
        await db.transact(
          db.tx.desings[designId].update({
            designName: value,
            updatedAt: Date.now(),
          })
        )
        setSaveStatus('saved')
        if (clearStatusRef.current) clearTimeout(clearStatusRef.current)
        clearStatusRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
      } catch {
        setSaveStatus('error')
        if (clearStatusRef.current) clearTimeout(clearStatusRef.current)
        clearStatusRef.current = setTimeout(() => setSaveStatus('idle'), 3000)
      }
    }, 2000)
  }

  function handleGoHome() {
    router.push('/dashboard')
  }

  return { design, name, saveStatus, handleNameChange, handleGoHome }
}
