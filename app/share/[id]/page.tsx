'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'
import { duplicateDesign } from '@/lib/duplicateDesign'

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: designId } = use(params)
    const router = useRouter()
    const { user } = db.useAuth()

    const { data, isLoading } = db.useQuery({
        desings: { $: { where: { id: designId } } },
    })

    const design = data?.desings?.[0] ?? null

    async function handleCopy() {
        if (!user) return router.push('/login')
        await duplicateDesign(user, design!)
        router.push('/dashboard')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center">
                <p className="text-sm text-[#9CA3AF]">Loading…</p>
            </div>
        )
    }

    if (!design || !design.isShared) {
        return (
            <div className="min-h-screen bg-[#F9F7F4] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-base font-semibold text-[#1A1A1A] mb-1">This design is private</h1>
                <p className="text-sm text-[#9CA3AF]">The owner hasn't shared this design publicly.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F9F7F4] flex flex-col items-center justify-center px-4">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 w-full max-w-sm text-center shadow-sm">
                <div className="w-full aspect-square rounded-xl bg-[#F9F7F4] mb-6 flex items-center justify-center">
                    <span className="text-4xl opacity-20">✦</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-1">Shared design</p>
                <h1 className="text-base font-semibold text-[#1A1A1A] mb-6">{design.designName}</h1>
                <button
                    onClick={handleCopy}
                    className="w-full bg-[#E85D75] hover:bg-[#D14D65] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                    + Copy to my designs
                </button>
                {!user && (
                    <p className="text-[10px] text-[#9CA3AF] mt-3">
                        You'll be asked to sign in first
                    </p>
                )}
            </div>
            <a href="/dashboard" className="mt-6 text-xs text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">
                🪡 Tatreez Design Studio
            </a>
        </div>
    )
}
