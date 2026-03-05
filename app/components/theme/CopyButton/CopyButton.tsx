"use client";
import React from "react";

interface CopyButtonProps {
    copied: boolean;
    onClick: () => void;
    className?: string;
    title?: string;
}

/**
 * Reusable copy button with visual feedback.
 * Shows a clipboard icon by default, and a green checkmark when `copied` is true.
 */
const CopyButton: React.FC<CopyButtonProps> = ({
    copied,
    onClick,
    className = "",
    title,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            title={copied ? "Copied!" : title || "Copy"}
            className={`h-8 w-8 flex items-center justify-center rounded-md transition-all duration-200 ${copied
                    ? "bg-[#00da92]/20 border border-[#00da92]/40"
                    : "bg-white/10 hover:bg-white/20 border border-white/10"
                } ${className}`}
        >
            {copied ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00da92"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-white"
                >
                    <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                    <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                </svg>
            )}
        </button>
    );
};

export default CopyButton;
