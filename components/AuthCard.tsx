import type { ReactNode } from 'react'

interface AuthCardProps {
    title: string
    subtitle: string
    children: ReactNode
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F4] px-4">
            <div className="mb-6 text-center">
                <p className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">tatreez</p>
                <p className="text-xs text-[#6B7280]">design studio</p>
            </div>
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-8 py-10">
                <h1 className="text-xl font-semibold text-[#1A1A1A] mb-1">{title}</h1>
                <p className="text-sm text-[#6B7280] mb-6">{subtitle}</p>
                {children}
            </div>
        </div>
    )
}
