import adminDB from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const { profiles } = await adminDB.query({
            profiles: { $: { where: { email: normalizedEmail } } },
        });

        const profile = profiles[0];

        if (!profile) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, profile.passwordHash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const token = await adminDB.auth.createToken(normalizedEmail);
        return NextResponse.json({ token, communityMember: profile.communityMember }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
