import db from "@/lib/db";
import { id } from "@instantdb/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SortOption = 'recent' | 'oldest' | 'az'

export function useDashboard() {
    const router = useRouter();
    const { user } = db.useAuth();
    const [sortBy, setSortBy] = useState<SortOption>('recent')
    const { data } = db.useQuery(
        user ? {
            desings: { $: { where: { userId: user.id, isDeleted: false } } },
            profiles: { $: { where: { userId: user.id } } },
        } : null
    );

    const profile = data?.profiles?.[0] ?? null
    const communityMember = profile?.communityMember ?? false
    const userInitial = user?.email?.[0]?.toUpperCase() ?? '?'
    async function handleNewDesign() {
        if (!user) return
        const designId = id();
        await db.transact(
            db.tx.desings[designId].update({
                userId: user.id,
                designName: `Untitled Design — ${new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                })}`,
                designData: {},
                createdAt: Date.now(),
                updatedAt: Date.now(),
                isDeleted: false,
                isShared: false,
            })
        )
        router.push(`/design/${designId}`)
    }

    async function handleRenameDesign(designId: string, newName: string, originalName: string) {
        const trimmed = newName.trim()
        if (trimmed === '' || trimmed === originalName.trim()) return
        await db.transact(
            db.tx.desings[designId].update({ designName: trimmed, updatedAt: Date.now() })
        )
    }

    async function handleDeleteDesign(designId: string) {
        await db.transact(
            db.tx.desings[designId].update({ isDeleted: true, deletedAt: Date.now() })
        )
    }

    async function handleDuplicate(design: typeof designs[number]) {
        if (!user) return
        const newId = id()
        await db.transact(
            db.tx.desings[newId].update({
                userId: user.id,
                designName: `${design.designName} — Copy`,
                designData: design.designData ?? {},
                createdAt: Date.now(),
                updatedAt: Date.now(),
                isDeleted: false,
                isShared: false,
            })
        )
    }

    const designs = (data?.desings ?? []).slice().sort((a, b) => {
        if (sortBy === 'oldest') return a.updatedAt - b.updatedAt
        if (sortBy === 'az') return a.designName.localeCompare(b.designName)
        return b.updatedAt - a.updatedAt
    })


    return {
        handleNewDesign,
        handleDuplicate,
        handleRenameDesign,
        designs,
        sortBy,
        setSortBy,
        communityMember,
        userInitial,
    }
}
