interface Props {
    id: string
    designName: string
    updatedAt: string
    onClick: () => void
}

export default function DesignCard({ designName, updatedAt, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-3 text-left hover:shadow-md hover:border-[#E85D75] transition-all group"
        >
            <div className="w-full aspect-square rounded-xl bg-[#F9F7F4] mb-3 flex items-center justify-center group-hover:bg-[#FFF0F3] transition-colors">
                <span className="text-2xl opacity-20">✦</span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A] truncate">
                {designName}
            </p>
            <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                Opened {updatedAt}
            </p>
        </button>
    )
}
