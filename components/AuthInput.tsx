import type { KeyboardEvent } from 'react'

interface AuthInputProps {
    label: string
    type: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export default function AuthInput({ label, type, value, onChange, placeholder, onKeyDown }: AuthInputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                className="border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#E85D75] focus:border-transparent"
            />
        </div>
    )
}
