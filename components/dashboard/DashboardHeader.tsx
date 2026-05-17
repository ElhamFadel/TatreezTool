interface Props {
    userInitial: string
}

export default function DashboardHeader({ userInitial }: Props) {
    return (
        <header className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <input
                type="text"
                placeholder="Search your designs..."
                className="text-sm text-[#6B7280] bg-[#F9F7F4] border border-[#E5E7EB] rounded-lg px-3 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-[#E85D75] focus:border-transparent"
            />
            <div className="flex items-center gap-3">
                <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border-2 border-[#9CA3AF] flex items-center justify-center text-[8px]">✓</span>
                    All changes saved
                </span>
                <div className="w-7 h-7 rounded-full bg-[#E85D75] flex items-center justify-center text-white text-xs font-medium">
                    E
                </div>
            </div>
        </header>
    )
}
