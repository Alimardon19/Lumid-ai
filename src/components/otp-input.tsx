import React from "react";

interface OTPInputProps {
    index: number;
    value: string;
    onChange: (value: string, index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    inputRef: (el: HTMLInputElement | null) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({index, value, onChange, onKeyDown, inputRef}) => (
    <input
        type="text"
        maxLength={1}
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value, index)}
        onKeyDown={(e) => onKeyDown(e, index)}
        className="w-16 h-16 text-center text-2xl font-bold bg-white border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
    />
);