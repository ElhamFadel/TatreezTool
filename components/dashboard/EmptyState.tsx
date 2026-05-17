interface Props {
    onNewDesign: () => void
}

export default function EmptyState({ onNewDesign }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center">
                <span className="text-2xl">✦</span>
            </div>
            <p className="text-sm text-[#6B7280] text-center">
                No designs yet.{' '}
                <button
                    onClick={onNewDesign}
                    className="text-[#E85D75] hover:underline font-medium"
                >
                    Click here
                </button>{' '}
                to get started.
            </p>
        </div>
    )
}
