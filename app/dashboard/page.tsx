'use client'

import { useRouter } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import DesignCard from '@/components/dashboard/DesignCard'
import EmptyState from '@/components/dashboard/EmptyState'
import NewDesignButton from '@/components/NewDesignButton'
import SkeletonCard from '@/components/dashboard/SkeletonCard'
import { useDashboard } from '@/hooks/useDashboard'
import { formatDate } from '@/lib/formatDate'

export default function DashboardPage() {
    const router = useRouter();
    const {
        handleNewDesign,
        handleDeleteDesign,
        handleShareDesign,
        handleDuplicate,
        handleRenameDesign,
        designs,
        isLoading,
        sortBy,
        setSortBy,
        communityMember,
        userInitial,
    } = useDashboard()


    return (
        <DashboardShell userInitial={userInitial} communityMember={communityMember}>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold text-[#1A1A1A]">
                    My designs
                </h1>
                <div className="flex items-center gap-3">
                    <select value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest' | 'az')} className="text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#E85D75]">
                        <option value="recent">Recently modified</option>
                        <option value="oldest">Oldest first</option>
                        <option value="az">A–Z</option>
                    </select>
                    <button
                        onClick={handleNewDesign}
                        className="bg-[#E85D75] hover:bg-[#D14D65] text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                    >
                        + New design
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : designs.length === 0 ? (
                <EmptyState onNewDesign={handleNewDesign} />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <NewDesignButton onClick={handleNewDesign} />
                    {designs.map((design) => (
                        <DesignCard
                            key={design.id}
                            id={design.id}
                            designName={design.designName}
                            updatedAt={formatDate(design.updatedAt)}
                            onClick={() => router.push(`/design/${design.id}`)}
                            isShared={design.isShared ?? false}
                            onDuplicate={() => handleDuplicate(design)}
                            onRename={(newName) => handleRenameDesign(design.id, newName, design.designName)}
                            onDelete={() => handleDeleteDesign(design.id)}
                            onShare={() => handleShareDesign(design.id, design.isShared ?? false)}
                        />
                    ))}
                </div>
            )}

        </DashboardShell>
    )
}
