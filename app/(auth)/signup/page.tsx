'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'
import { useAuthForm } from '@/hooks/useAuthForm'
import AuthCard from '@/components/AuthCard'
import AuthInput from '@/components/AuthInput'
import AuthError from '@/components/AuthError'

export default function SignupPage() {
    const router = useRouter()
    const { email, setEmail, password, setPassword, error, setError, loading, setLoading, validate } = useAuthForm()

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.error ?? 'Signup failed')
                return
            }
            await db.auth.signInWithToken(data.token)
            router.push('/dashboard')
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthCard title="Create your account" subtitle="Start designing your tatreez patterns">
            <div className="flex flex-col gap-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    Use the same email as your Tilted Leaves community account to get 50% off.
                </div>
                <AuthError message={error} />
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                />
                <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Min. 8 characters"
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#E85D75] hover:bg-[#D14D65] disabled:opacity-60 text-white font-medium text-sm rounded-xl py-2.5 transition-colors"
                >
                    {loading ? 'Creating account…' : 'Create account'}
                </button>
                <p className="text-center text-sm text-[#6B7280]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#E85D75] hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
