import db from "@/lib/db";
import { id } from "@instantdb/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { duplicateDesign } from "@/lib/duplicateDesign";
import { useProfile } from "@/hooks/useProfile";

type SortOption = 'recent' | 'oldest' | 'az'

export function useDashboard() {
    const router = useRouter();
    const { user } = db.useAuth();
    const [sortBy, setSortBy] = useState<SortOption>('recent')
    const { communityMember, userInitial } = useProfile()
    const { data, isLoading } = db.useQuery(
        user ? {
            desings: { $: { where: { userId: user.id, isDeleted: false } } },
        } : null
    );
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

    async function handleShareDesign(designId: string, currentValue: boolean) {
        await db.transact(
            db.tx.desings[designId].update({ isShared: !currentValue })
        )
    }

    async function handleDuplicate(design: typeof designs[number]) {
        if (!user) return
        await duplicateDesign(user, design)
    }

    const designs = (data?.desings ?? []).slice().sort((a, b) => {
        if (sortBy === 'oldest') return a.updatedAt - b.updatedAt
        if (sortBy === 'az') return a.designName.localeCompare(b.designName)
        return b.updatedAt - a.updatedAt
    })


    return {
        handleNewDesign,
        handleDeleteDesign,
        handleShareDesign,
        handleDuplicate,
        handleRenameDesign,
        designs,
        isLoading,
        sortBy,
        setSortBy,
        communityMember,
        userInitial,
    }
}
