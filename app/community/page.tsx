'use client'

import { useRouter } from 'next/navigation'
import db from '@/lib/db'
import { duplicateDesign } from '@/lib/duplicateDesign'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { useProfile } from '@/hooks/useProfile'
import { formatDate } from '@/lib/formatDate'

export default function CommunityPage() {
    const router = useRouter()
    const { communityMember, userInitial } = useProfile()
    const { user } = db.useAuth()

    const { data } = db.useQuery({
        desings: { $: { where: { isShared: true, isDeleted: false } } },
    })

    const sharedDesigns = data?.desings ?? []

    async function handleCopyToMyDesigns(design: typeof sharedDesigns[number]) {
        if (!user) {
            router.push('/login')
            return
        }
        await duplicateDesign(user, design)
        router.push('/dashboard')
    }

    return (
        <DashboardShell userInitial={userInitial} communityMember={communityMember}>

                    <h1 className="text-lg font-semibold text-[#1A1A1A] mb-1">Community</h1>
                    <p className="text-xs text-[#9CA3AF] mb-6">
                        Browse and copy designs shared by the Tatreez community.
                    </p>

                    {sharedDesigns.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-4xl mb-4">🪡</p>
                            <p className="text-sm text-[#9CA3AF]">No shared designs yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {sharedDesigns.map((design) => (
                                <div
                                    key={design.id}
                                    className="bg-white border border-[#E5E7EB] rounded-2xl p-3"
                                >
                                    <div className="w-full aspect-square rounded-xl bg-[#F9F7F4] mb-3 flex items-center justify-center">
                                        <span className="text-2xl opacity-20">✦</span>
                                    </div>
                                    <p className="text-xs font-medium text-[#1A1A1A] truncate">{design.designName}</p>
                                    <p className="text-[10px] text-[#9CA3AF] mt-0.5 mb-2">
                                        Shared {formatDate(design.updatedAt)}
                                    </p>
                                    <button
                                        onClick={() => handleCopyToMyDesigns(design)}
                                        className="w-full text-xs text-[#E85D75] border border-[#E85D75] py-1.5 rounded-lg hover:bg-[#FFF0F3] transition-colors"
                                    >
                                        + Copy to my designs
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

        </DashboardShell>
    )
}
