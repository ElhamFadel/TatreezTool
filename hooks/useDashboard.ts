import db from "@/lib/db";
import { id } from "@instantdb/admin";
import { useRouter } from "next/navigation";

export function useDashboard() {
    const router = useRouter();
    const { user } = db.useAuth();
    const { data, isLoading: dataLoading } = db.useQuery(
        user ? {
            desings: {
                $: {
                    where: {
                        userId: user.id,
                        isDeleted: false
                    }
                }
            }
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

    const designs = (data?.desings ?? [])
        .slice()
        .sort((a, b) => b.updatedAt - a.updatedAt)


    return {
        handleNewDesign,
        designs
    }
}
