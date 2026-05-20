'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
    id: string
    designName: string
    updatedAt: string
    onClick: () => void
    onDuplicate: () => void
    onRename: (newName: string) => void
    onDelete: () => void
}

export default function DesignCard({ designName, updatedAt, onClick, onDuplicate, onRename, onDelete }: Props) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false)
    const [renameValue, setRenameValue] = useState(designName)
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

    function commitRename() {
        onRename(renameValue)
        setIsRenaming(false)
    }

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-3 text-left hover:shadow-md hover:border-[#E85D75] transition-all"
            >
                <div className="w-full aspect-square rounded-xl bg-[#F9F7F4] mb-3 flex items-center justify-center group-hover:bg-[#FFF0F3] transition-colors">
                    <span className="text-2xl opacity-20">✦</span>
                </div>
                {isRenaming ? (
                    <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={commitRename}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') commitRename()
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-xs font-medium text-[#1A1A1A] bg-transparent outline-none border-b border-[#E85D75]"
                    />
                ) : (
                    <p
                        onClick={(e) => {
                            e.stopPropagation()
                            setRenameValue(designName)
                            setIsRenaming(true)
                        }}
                        className="text-xs font-medium text-[#1A1A1A] truncate cursor-text"
                    >
                        {designName}
                    </p>
                )}
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
                                setRenameValue(designName)
                                setIsRenaming(true)
                                setMenuOpen(false)
                            }}
                            className="w-full text-left text-xs text-[#1A1A1A] px-3 py-2 hover:bg-[#F9F7F4] transition-colors"
                        >
                            Rename
                        </button>
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()
                                setMenuOpen(false)
                            }}
                            className="w-full text-left text-xs text-[#E85D75] px-3 py-2 hover:bg-[#FFF0F3] transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
