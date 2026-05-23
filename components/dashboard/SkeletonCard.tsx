export default function SkeletonCard() {
    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3 animate-pulse">
            <div className="w-full aspect-square rounded-xl bg-[#F3F4F6] mb-3" />
            <div className="h-3 bg-[#F3F4F6] rounded-md w-3/4 mb-2" />
            <div className="h-2.5 bg-[#F3F4F6] rounded-md w-1/2" />
        </div>
    )
}
