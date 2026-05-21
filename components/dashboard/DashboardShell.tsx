import { ReactNode } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

interface Props {
    userInitial: string
    communityMember: boolean
    children: ReactNode
}

export default function DashboardShell({ userInitial, communityMember, children }: Props) {
    return (
        <div className="min-h-screen bg-[#F9F7F4] flex">
            <Sidebar />
            <div className="ml-52 flex-1 flex flex-col">
                <DashboardHeader userInitial={userInitial} communityMember={communityMember} />
                <main className="px-8 py-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
