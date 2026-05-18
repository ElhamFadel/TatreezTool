'use client'

import { use, useEffect, useState } from 'react'
import { useDesign } from '@/hooks/useDesign'

export default function DesignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { design, name, saveStatus, queryLoading, handleNameChange, handleGoHome } = useDesign(id)
  const [isEditing, setIsEditing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (saveStatus === 'idle') return
    function handleMouseMove(e: MouseEvent) {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [saveStatus])

  if (!design) return null

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
        <button
          onClick={handleGoHome}
          className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
        >
          ◀ Home
        </button>
      </header>
      <main className="max-w-2xl mx-auto py-16 px-6">
        {isEditing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false)
            }}
            placeholder="Untitled Design"
            className="w-full bg-transparent text-2xl font-semibold text-[#1A1A1A] outline-none border-b-2 border-[#E85D75] pb-1"
          />
        ) : (
          <h1
            onClick={() => setIsEditing(true)}
            className="text-2xl font-semibold text-[#1A1A1A] cursor-text border-b-2 border-transparent hover:border-[#E5E7EB] transition-colors pb-1"
          >
            {name || 'Untitled Design'}
          </h1>
        )}
        {saveStatus !== 'idle' && (
          <div
            className="fixed pointer-events-none z-50 px-2 py-1 rounded-md bg-white border border-[#E5E7EB] shadow-sm text-xs"
            style={{ left: mousePos.x + 14, top: mousePos.y + 14 }}
          >
            {saveStatus === 'saving' && <span className="text-[#9CA3AF]">Saving...</span>}
            {saveStatus === 'saved' && <span className="text-green-500">✓ Saved</span>}
            {saveStatus === 'error' && <span className="text-red-400">Save failed</span>}
          </div>
        )}
      </main>
    </div>
  )
}
