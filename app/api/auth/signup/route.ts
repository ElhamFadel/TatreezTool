import db from "@/lib/db";
import { id } from "@instantdb/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

const COMMUNITY_EMAILS = [
    'member2@test.com',
    'vip@tilted.com',
    'member1@test.com'
]

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const normalizedEmail = email.toLowerCase().trim();

    try {

        const token = await db.auth.createToken(normalizedEmail);
        const passwordHash = await bcrypt.hash(password, 10);
        const communityMember = COMMUNITY_EMAILS.includes(normalizedEmail);

        const user = await db.auth.getUser({ email: normalizedEmail });

        await db.transact(
            db.tx.profiles[id()].update({
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
