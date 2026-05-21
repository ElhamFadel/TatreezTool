'use client'

import { useEffect, useRef, useState } from 'react'

function MenuItem({ label, onClick, variant = 'default' }: {
    label: string
    onClick: () => void
    variant?: 'default' | 'danger'
}) {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); onClick() }}
            className={`w-full text-left text-xs px-3 py-2 transition-colors ${
                variant === 'danger'
                    ? 'text-[#E85D75] hover:bg-[#FFF0F3]'
                    : 'text-[#1A1A1A] hover:bg-[#F9F7F4]'
            }`}
        >
            {label}
        </button>
    )
}

interface Props {
    id: string
    designName: string
    updatedAt: string
    isShared: boolean
    onClick: () => void
    onDuplicate: () => void
    onRename: (newName: string) => void
    onDelete: () => void
    onShare: () => void
}

export default function DesignCard({ id, designName, updatedAt, isShared, onClick, onDuplicate, onRename, onDelete, onShare }: Props) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false)
    const [renameValue, setRenameValue] = useState(designName)
    const [linkCopied, setLinkCopied] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    function handleCopyLink() {
        navigator.clipboard.writeText(`${window.location.origin}/share/${id}`)
        setLinkCopied(true)
        setMenuOpen(false)
        setTimeout(() => setLinkCopied(false), 2000)
    }

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
            {linkCopied && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[10px] px-2.5 py-1 rounded-lg whitespace-nowrap z-20">
                    Link copied!
                </div>
            )}
            <button
                onClick={onClick}
                className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-3 text-left hover:shadow-md hover:border-[#E85D75] transition-all"
            >
                <div className="relative w-full aspect-square rounded-xl bg-[#F9F7F4] mb-3 flex items-center justify-center group-hover:bg-[#FFF0F3] transition-colors">
                    <span className="text-2xl opacity-20">✦</span>
                    {isShared && (
                        <span className="absolute top-2 left-2 text-[10px] font-medium bg-[#E85D75] text-white px-1.5 py-0.5 rounded-md">
                            Public
                        </span>
                    )}
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
                        <MenuItem label="Rename" onClick={() => { setRenameValue(designName); setIsRenaming(true); setMenuOpen(false) }} />
                        <MenuItem label="Duplicate" onClick={() => { onDuplicate(); setMenuOpen(false) }} />
                        <MenuItem label={isShared ? 'Make private' : 'Share'} onClick={() => { onShare(); setMenuOpen(false) }} />
                        {isShared && (
                            <MenuItem label="Copy link" onClick={handleCopyLink} />
                        )}
                        <MenuItem label="Delete" onClick={() => { onDelete(); setMenuOpen(false) }} variant="danger" />
                    </div>
                )}
            </div>
        </div>
    )
}
