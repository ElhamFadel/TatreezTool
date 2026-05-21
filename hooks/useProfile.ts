import db from '@/lib/db'

export function useProfile() {
    const { user } = db.useAuth()

    const { data } = db.useQuery(
        user ? {
            profiles: { $: { where: { userId: user.id } } },
        } : null
    )

    const profile = data?.profiles?.[0] ?? null
    const communityMember = profile?.communityMember ?? false
    const userInitial = user?.email?.[0]?.toUpperCase() ?? '?'

    return { communityMember, userInitial }
}
