'use client'

import { useState } from 'react'

export function useAuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const clearError = () => setError('')

    const validate = (): boolean => {
        if (!email || !password) {
            setError('Email and password are required.')
            return false
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return false
        }
        return true
    }

    return {
        email, setEmail,
        password, setPassword,
        error, setError, clearError,
        loading, setLoading,
        validate,
    }
}
