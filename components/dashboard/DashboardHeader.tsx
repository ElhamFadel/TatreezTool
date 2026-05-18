interface Props {
    userInitial: string
    communityMember: boolean
}

export default function DashboardHeader({ userInitial, communityMember }: Props) {
    return (
        <header className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <input
                type="text"
                placeholder="Search your designs..."
                className="text-sm text-[#6B7280] bg-[#F9F7F4] border border-[#E5E7EB] rounded-lg px-3 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-[#E85D75] focus:border-transparent"
            />
            <div className="flex items-center gap-3">
                {communityMember ? (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <span>✓</span>
                        Community Member — 50% discount applied
                    </span>
                ) : (
                    <span className="text-xs text-[#9CA3AF]">Standard plan</span>
                )}
                <div className="w-7 h-7 rounded-full bg-[#E85D75] flex items-center justify-center text-white text-xs font-medium">
                    {userInitial}
                </div>
            </div>
        </header>
    )
}
