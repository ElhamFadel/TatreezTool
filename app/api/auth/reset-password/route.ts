import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import adminDb from '@/lib/admin'

export async function POST(req: NextRequest) {
    const { email, newPassword, token } = await req.json()

    if (!email || !newPassword || !token) {
        return NextResponse.json(
            { error: 'Email, password and token are required' },
            { status: 400 }
        )
    }

    if (newPassword.length < 8) {
        return NextResponse.json(
            { error: 'Password must be at least 8 characters' },
            { status: 400 }
        )
    }

    const normalizedEmail = email.toLowerCase().trim()

    try {
        const result = await adminDb.query({
            profiles: {
                $: { where: { email: normalizedEmail } },
            },
        })

        const profile = result.profiles[0]

        if (!profile) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await adminDb.transact(
            adminDb.tx.profiles[profile.id].update({ passwordHash })
        )

        return NextResponse.json({ success: true }, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        )
    }
}
