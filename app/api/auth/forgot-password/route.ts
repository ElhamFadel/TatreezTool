import { NextRequest, NextResponse } from 'next/server'
import adminDb from '@/lib/admin'

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    if (!email) {
        return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
        )
    }

    const normalizedEmail = email.toLowerCase().trim()

    try {
        const user = await adminDb.auth.getUser({ email: normalizedEmail })

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        await adminDb.auth.sendMagicCode(normalizedEmail)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to send reset email' },
            { status: 500 }
        )
    }
}


