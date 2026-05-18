import Link from "next/link"

export default function Sidebar() {
    return (
        <aside className="w-52 bg-white border-r border-[#E5E7EB] flex flex-col py-6 px-4 fixed h-full">
            <div className="mb-8 px-2">
                <div className="flex items-center gap-1.5">
                    🪡
                    <span className="text-sm font-semibold text-[#1A1A1A]">Tatreez</span>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-[#9CA3AF] px-2 mb-2">
                    Workspace
                </p>
                <nav className="flex flex-col gap-0.5">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-[#FFF0F3] text-[#E85D75] text-sm font-medium"
                    >
                        <span>👘</span> My designs
                    </Link>


                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[#9CA3AF] text-sm">
                        Templates
                        <span className="ml-auto text-[10px] bg-[#F3F4F6] text-[#9CA3AF] px-1.5 py-0.5 rounded">
                            soon
                        </span>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
