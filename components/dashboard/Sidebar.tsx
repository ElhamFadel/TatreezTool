'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { IconCommunity, IconTrash } from '@/components/icons'

const NAV_ITEMS: { href: string; label: string; icon: ReactNode }[] = [
    { href: '/dashboard', label: 'My designs', icon: <span>👘</span> },
    { href: '/community', label: 'Community', icon: <IconCommunity /> },
]

export default function Sidebar() {
    const pathname = usePathname()

    function navClass(href: string) {
        const active = pathname === href
        return `flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
            active
                ? 'bg-[#FFF0F3] text-[#E85D75] font-medium'
                : 'text-[#9CA3AF] hover:bg-[#F9F7F4] hover:text-[#1A1A1A]'
        }`
    }

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
                    {NAV_ITEMS.map(({ href, label, icon }) => (
                        <Link key={href} href={href} className={navClass(href)}>
                            {icon}
                            {label}
                        </Link>
                    ))}
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[#9CA3AF] text-sm">
                        Templates
                        <span className="ml-auto text-[10px] bg-[#F3F4F6] text-[#9CA3AF] px-1.5 py-0.5 rounded">
                            soon
                        </span>
                    </div>
                    <Link href="/trash" className={navClass('/trash')}>
                        <IconTrash />
                        Trash
                    </Link>
                </nav>
            </div>
        </aside>
    )
}
