'use client'

import { isValidEmail, isValidPassword } from '@/lib/validation'
import { useState } from 'react'

export function useAuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const clearError = () => setError('')

    function validateEmail(): boolean {
        if (!email) {
            setError('Email is required')
            return false
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address')
            return false
        }
        return true
    }

    function validatePassword(): boolean {
        if (!password) {
            setError('Password is required')
            return false
        }
        if (!isValidPassword(password)) {
            setError('Password must be at least 8 characters')
            return false
        }
        return true
    }

    function validateConfirmPassword(): boolean {
        if (!confirmPassword) {
            setError('Please confirm your password')
            return false
        }
        if (!passwordsMatch(password, confirmPassword)) {
            setError('Passwords do not match')
            return false
        }
        return true
    }

    function validateLogin(): boolean {
        return validateEmail() && validatePassword()
    }

    function validateSignup(): boolean {
        return validateEmail() && validatePassword()
    }

    function validateReset(): boolean {
        return validatePassword() && validateConfirmPassword()
    }

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, setError, clearError,
        loading, setLoading,
        validateEmail,
        validateLogin,
        validateSignup,
        validateReset,
    }
}
