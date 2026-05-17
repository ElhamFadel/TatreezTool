'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import db from '@/lib/db'
import { useAuthForm } from '@/hooks/useAuthForm'
import AuthCard from '@/components/AuthCard'
import AuthInput from '@/components/AuthInput'
import AuthError from '@/components/AuthError'

type Step = 'email' | 'reset' | 'success'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const form = useAuthForm()
    const [step, setStep] = useState<Step>('email')
    const [code, setCode] = useState('')

    async function handleSendCode() {
        if (!form.validateEmail()) return
        form.setLoading(true)
        form.clearError()
        try {
            await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email.toLowerCase().trim() }),
            })
            setStep('reset')
        } catch {
            form.setError('Something went wrong. Please try again.')
        } finally {
            form.setLoading(false)
        }
    }

    async function handleResetPassword() {
        if (!form.validateReset(code)) return
        form.setLoading(true)
        form.clearError()
        try {
            await db.auth.signInWithMagicCode({
                email: form.email.toLowerCase().trim(),
                code,
            })

            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email.toLowerCase().trim(),
                    newPassword: form.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                form.setError(data.error || 'Failed to reset password')
                return
            }

            setStep('success')
            setTimeout(() => router.push('/login'), 3000)
        } catch {
            form.setError('Invalid or expired code. Please try again.')
        } finally {
            form.setLoading(false)
        }
    }

    if (step === 'success') {
        return (
            <AuthCard
                title="Password reset!"
                subtitle="Your password has been updated successfully"
            >
                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xl">🟢</span>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                        Redirecting you to sign in...
                    </p>
                    <Link
                        href="/login"
                        className="text-sm text-[#E85D75] hover:underline font-medium"
                    >
                        Go to sign in  &rarr;
                    </Link>
                </div>
            </AuthCard>
        )
    }

    if (step === 'email') {
        return (
            <AuthCard
                title="Forgot your password?"
                subtitle="Enter your email and we'll send you a verification code"
            >
                <div className="flex flex-col gap-4">
                    <AuthError message={form.error} />
                    <AuthInput
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={form.setEmail}
                        placeholder="you@example.com"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
                    />
                    <button
                        onClick={handleSendCode}
                        disabled={form.loading}
                        className="w-full bg-[#E85D75] hover:bg-[#D14D65] disabled:opacity-60 text-white font-medium text-sm rounded-xl py-2.5 transition-colors"
                    >
                        {form.loading ? 'Sending...' : 'Send verification code'}
                    </button>
                    <Link
                        href="/login"
                        className="text-center text-sm text-[#E85D75] hover:underline font-medium"
                    >
                        ← Back to sign in
                    </Link>
                </div>
            </AuthCard>
        )
    }

    return (
        <AuthCard
            title="Reset your password"
            subtitle={`Enter the code we sent to ${form.email}`}
        >
            <div className="flex flex-col gap-4">

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">
                    Check your inbox for a 6-digit verification code.
                </div>

                <AuthError message={form.error} />

                <AuthInput
                    label="Verification code"
                    type="text"
                    value={code}
                    onChange={setCode}
                    placeholder="123456"
                />

                <AuthInput
                    label="New password"
                    type="password"
                    value={form.password}
                    onChange={form.setPassword}
                    placeholder="Min. 8 characters"
                />

                <AuthInput
                    label="Confirm new password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={form.setConfirmPassword}
                    placeholder="Repeat your new password"
                    onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
                />

                <button
                    onClick={handleResetPassword}
                    disabled={form.loading}
                    className="w-full bg-[#E85D75] hover:bg-[#D14D65] disabled:opacity-60 text-white font-medium text-sm rounded-xl py-2.5 transition-colors"
                >
                    {form.loading ? 'Resetting...' : 'Reset password'}
                </button>

                <button
                    onClick={() => {
                        setStep('email')
                        form.clearError()
                        setCode('')
                    }}
                    className="text-center text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                    Use a different email
                </button>

            </div>
        </AuthCard>
    )
}
