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
                    <Link
                        href="/trash"
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[#9CA3AF] hover:bg-[#F9F7F4] hover:text-[#1A1A1A] text-sm transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4h6v2" />
                        </svg>
                        Trash
                    </Link>
                </nav>
            </div>
        </aside>
    )
}
