"use client";
import { useState, useCallback, useRef } from "react";

/**
 * Custom hook for copy-to-clipboard with visual feedback.
 * Returns `{ copied, copyToClipboard }`.
 * `copied` is `true` for 2 seconds after a successful copy.
 */
const useCopyToClipboard = (duration = 2000) => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const copyToClipboard = useCallback(
        async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);

                // Clear any existing timeout
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    setCopied(false);
                    timeoutRef.current = null;
                }, duration);

                return true;
            } catch (err) {
                console.error("Failed to copy: ", err);
                return false;
            }
        },
        [duration]
    );

    return { copied, copyToClipboard };
};

export default useCopyToClipboard;
