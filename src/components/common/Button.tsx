import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

export default function Button({ children, className = "", onClick, ariaLabel }: Props) {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={`px-4 py-2 rounded-lg font-semibold transition ${className}`}
        >
            {children}
        </button>
    );
}
