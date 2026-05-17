'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthCard from '@/components/AuthCard'
import AuthInput from '@/components/AuthInput'
import AuthError from '@/components/AuthError'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async () => {
        if (!email) {
            setError('Email is required.')
            return
        }
        setLoading(true)
        setError('')
        try {
            await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            setSubmitted(true)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <AuthCard title="Check your inbox" subtitle="We sent you a reset link">
                <div className="flex flex-col gap-6">
                    <p className="text-sm text-[#6B7280]">
                        If <span className="font-medium text-[#1A1A1A]">{email}</span> is registered,
                        you&apos;ll receive a reset link shortly.
                    </p>
                    <Link href="/login" className="text-sm text-[#E85D75] hover:underline font-medium">
                        ← Back to sign in
                    </Link>
                </div>
            </AuthCard>
        )
    }

    return (
        <AuthCard title="Reset your password" subtitle="Enter your email and we'll send a reset link">
            <div className="flex flex-col gap-4">
                <AuthError message={error} />
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#E85D75] hover:bg-[#D14D65] disabled:opacity-60 text-white font-medium text-sm rounded-xl py-2.5 transition-colors"
                >
                    {loading ? 'Sending…' : 'Send reset link'}
                </button>
                <Link href="/login" className="text-center text-sm text-[#E85D75] hover:underline font-medium">
                    ← Back to sign in
                </Link>
            </div>
        </AuthCard>
    )
}
