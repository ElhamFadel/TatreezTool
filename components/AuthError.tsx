interface AuthErrorProps {
    message: string
}

export default function AuthError({ message }: AuthErrorProps) {
    if (!message) return null
    return (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
            {message}
        </div>
    )
}
