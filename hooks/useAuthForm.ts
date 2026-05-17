import { useState } from 'react'

export function useAuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function clearError() {
        setError('')
    }

    function validate(): boolean {
        if (!email || !password) {
            setError('Email and password are required')
            return false
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return false
        }
        return true
    }

    function validateEmail(): boolean {
        if (!email) {
            setError('Email is required')
            return false
        }
        return true
    }

    function validateReset(code: string): boolean {
        if (!code) {
            setError('Please enter the verification code')
            return false
        }
        if (!password) {
            setError('Please enter a new password')
            return false
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return false
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        return true
    }

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, setError, clearError,
        loading, setLoading,
        validate,
        validateEmail,
        validateReset,
    }
}
