export default function NewDesignButton() {
    return (
        <button className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-4 flex flex-col items-center justify-center aspect-square hover:border-[#E85D75] hover:bg-[#FFF0F3] transition-all group">
            <span className="text-2xl text-[#9CA3AF] group-hover:text-[#E85D75] transition-colors">+</span>
            <span className="text-xs text-[#9CA3AF] group-hover:text-[#E85D75] mt-1 transition-colors">New design</span>
        </button>
    )
}
