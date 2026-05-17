'use client'

import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DesignCard from '@/components/dashboard/DesignCard'
import EmptyState from '@/components/dashboard/EmptyState'
import NewDesignButton from '@/components/NewDesignButton'
import { useDashboard } from '@/hooks/useDashboard'

const MOCK_DESIGNS = [
    { id: '1', designName: 'Thobe front panel', updatedAt: '2 hrs ago' },
    { id: '2', designName: 'Sleeve border', updatedAt: 'Yesterday' },
    { id: '3', designName: 'Pillow cushion v2', updatedAt: '3 days ago' },
    { id: '4', designName: 'Geometric border', updatedAt: '1 week ago' },
    { id: '5', designName: 'Ain al-shams motif', updatedAt: '2 weeks ago' },
]

export default function DashboardPage() {
    const router = useRouter();
    const {
        handleNewDesign,
    } = useDashboard()


    return (
        <div className="min-h-screen bg-[#F9F7F4] flex">

            <Sidebar />

            <div className="ml-52 flex-1 flex flex-col">

                <DashboardHeader userInitial="E" />

                <main className="px-8 py-8">

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-lg font-semibold text-[#1A1A1A]">
                            My designs
                        </h1>
                        <div className="flex items-center gap-3">
                            <select className="text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#E85D75]">
                                <option>Recently opened</option>
                                <option>Oldest first</option>
                                <option>A–Z</option>
                            </select>
                            <NewDesignButton />
                        </div>
                    </div>

                    {MOCK_DESIGNS.length === 0 ? (
                        <EmptyState onNewDesign={handleNewDesign} />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                            <button
                                onClick={handleNewDesign}
                                className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-4 flex flex-col items-center justify-center aspect-square hover:border-[#E85D75] hover:bg-[#FFF0F3] transition-all group"
                            >
                                <span className="text-2xl text-[#9CA3AF] group-hover:text-[#E85D75] transition-colors">+</span>
                                <span className="text-xs text-[#9CA3AF] group-hover:text-[#E85D75] mt-1 transition-colors">New design</span>
                            </button>

                            {MOCK_DESIGNS.map((design) => (
                                <DesignCard
                                    key={design.id}
                                    id={design.id}
                                    designName={design.designName}
                                    updatedAt={design.updatedAt}
                                    onClick={() => router.push(`/design/${design.id}`)}
                                />
                            ))}

                        </div>
                    )}

                </main>

            </div>

        </div>
    )
}
