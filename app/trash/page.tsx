'use client'

import DashboardShell from '@/components/dashboard/DashboardShell'
import { useTrash } from '@/hooks/useTrash'
import { useDashboard } from '@/hooks/useDashboard'
import { formatDate } from '@/lib/formatDate'

export default function TrashPage() {
    const { trashedDesigns, handleRestore, handlePermanentDelete } = useTrash()
    const { communityMember, userInitial } = useDashboard()

    return (
        <DashboardShell userInitial={userInitial} communityMember={communityMember}>

                    <h1 className="text-lg font-semibold text-[#1A1A1A] mb-1">Trash</h1>
                    <p className="text-xs text-[#9CA3AF] mb-6">
                        Designs are permanently deleted after 30 days.
                    </p>

                    {trashedDesigns.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4h6v2" />
                            </svg>
                            <p className="text-sm text-[#9CA3AF]">Trash is empty</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {trashedDesigns.map((design) => (
                                <div
                                    key={design.id}
                                    className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-[#1A1A1A]">{design.designName}</p>
                                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                                            Deleted {design.deletedAt ? formatDate(design.deletedAt) : '—'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleRestore(design.id)}
                                            className="text-xs text-[#E85D75] border border-[#E85D75] px-3 py-1.5 rounded-lg hover:bg-[#FFF0F3] transition-colors"
                                        >
                                            Restore
                                        </button>
                                        <button
                                            onClick={() => handlePermanentDelete(design.id)}
                                            className="text-xs text-[#9CA3AF] border border-[#E5E7EB] px-3 py-1.5 rounded-lg hover:bg-[#F9F7F4] hover:text-[#E85D75] transition-colors"
                                        >
                                            Delete forever
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

        </DashboardShell>
    )
}
