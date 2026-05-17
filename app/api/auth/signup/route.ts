import adminDB from "@/lib/admin";
import { id } from "@instantdb/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

const COMMUNITY_EMAILS = [
    'member2@test.com',
    'vip@tilted.com',
    'member1@test.com'
]

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()

  try {
    const { profiles } = await adminDB.query({
      profiles: { $: { where: { email: normalizedEmail } } },
    })

    if (profiles.length > 0) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const communityMember = COMMUNITY_EMAILS.includes(normalizedEmail)
    const token = await adminDB.auth.createToken(normalizedEmail)
    const user = await adminDB.auth.getUser({ email: normalizedEmail })

        await adminDB.transact(
            adminDB.tx.profiles[id()].update({
                userId: user.id,
                email: normalizedEmail,
                passwordHash,
                communityMember,
                createdAt: Date.now(),
            })
        );

        return NextResponse.json({ token }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }

}
