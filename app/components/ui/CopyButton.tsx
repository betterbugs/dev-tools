"use client";

import React, { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { toast } from "react-toastify";

interface CopyButtonProps {
  text: string;
  variant?: "icon" | "text";
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  variant = "icon",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      type="button"
      aria-label="Copy to clipboard"
      disabled={!text}
    >
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        {copied ? (
          <Check size={20} weight="bold" />
        ) : (
          <Copy size={20} />
        )}

        {variant === "text" && (
          <span>
            {copied ? "Copied!" : "Copy"}
          </span>
        )}
      </div>
    </button>
  );
};

export default CopyButton;