'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
    id: string
    designName: string
    updatedAt: string
    onClick: () => void
    onDuplicate: () => void
}

export default function DesignCard({ designName, updatedAt, onClick, onDuplicate }: Props) {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!menuOpen) return
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-3 text-left hover:shadow-md hover:border-[#E85D75] transition-all"
            >
                <div className="w-full aspect-square rounded-xl bg-[#F9F7F4] mb-3 flex items-center justify-center group-hover:bg-[#FFF0F3] transition-colors">
                    <span className="text-2xl opacity-20">✦</span>
                </div>
                <p className="text-xs font-medium text-[#1A1A1A] truncate">{designName}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">Opened {updatedAt}</p>
            </button>

            <div ref={menuRef} className="absolute top-2 right-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen((prev) => !prev)
                    }}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-md bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A] transition-all text-sm"
                >
                    ···
                </button>
                {menuOpen && (
                    <div className="absolute right-0 top-7 bg-white border border-[#E5E7EB] rounded-xl shadow-md py-1 w-36 z-10">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onDuplicate()
                                setMenuOpen(false)
                            }}
                            className="w-full text-left text-xs text-[#1A1A1A] px-3 py-2 hover:bg-[#F9F7F4] transition-colors"
                        >
                            Duplicate
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
