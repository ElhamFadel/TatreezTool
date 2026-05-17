export const PASSWORD_MIN_LENGTH = 8

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


export function isValidPassword(password: string): boolean {
    return password.length >= PASSWORD_MIN_LENGTH
}

export function passwordsMatch(
    password: string,
    confirmPassword: string
): boolean {
    return password === confirmPassword
}
