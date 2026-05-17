import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import adminDb from '@/lib/admin'

export async function POST(req: NextRequest) {
  const { email, newPassword } = await req.json()

  if (!email || !newPassword) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }



  const normalizedEmail = email.toLowerCase().trim()

  try {
    const { profiles } = await adminDb.query({
      profiles: { $: { where: { email: normalizedEmail } } },
    })

    const profile = profiles[0]

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)

    await adminDb.transact(
      adminDb.tx.profiles[profile.id].update({ passwordHash })
    )

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
