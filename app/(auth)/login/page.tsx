'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import db from '@/lib/db-client'
import { useAuthForm } from '@/hooks/useAuthForm'
import AuthCard from '@/components/AuthCard'
import AuthInput from '@/components/AuthInput'
import AuthError from '@/components/AuthError'

export default function LoginPage() {
    const router = useRouter()
    const { email, setEmail, password, setPassword, error, setError, loading, setLoading, validate } = useAuthForm()

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.error ?? 'Login failed')
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit()
    }

    return (
        <AuthCard title="Welcome back" subtitle="Sign in to your account">
            <div className="flex flex-col gap-4">
                <AuthError message={error} />
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    onKeyDown={handleKeyDown}
                />
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-[#1A1A1A]">Password</label>
                        <Link href="/forgot-password" className="text-xs text-[#E85D75] hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        onKeyDown={handleKeyDown}
                        className="border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#E85D75] focus:border-transparent"
                    />
                </div>
                <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer">
                    <input type="checkbox" className="accent-[#E85D75]" />
                    Remember me
                </label>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#E85D75] hover:bg-[#D14D65] disabled:opacity-60 text-white font-medium text-sm rounded-xl py-2.5 transition-colors"
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
                <p className="text-center text-sm text-[#6B7280]">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-[#E85D75] hover:underline font-medium">
                        Create one
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
