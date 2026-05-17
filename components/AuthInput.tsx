interface Props {
    label: string
    type: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function AuthInput({
    label, type, value, onChange, placeholder, onKeyDown
}: Props) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#E85D75] focus:border-transparent transition-all"
            />
        </div>
    )
}
