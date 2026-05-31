'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  className = '',
  maxVisiblePages = 7,
}: PaginationProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Reset refs array when total pages change
    buttonRefs.current = buttonRefs.current.slice(0, totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isMounted) return;
    const currentBtn = buttonRefs.current[currentPage - 1];
    if (currentBtn && currentBtn.parentElement) {
      const rect = currentBtn.getBoundingClientRect();
      const parentRect = currentBtn.parentElement.getBoundingClientRect();
      setUnderlineStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  }, [currentPage, totalPages, isMounted]);

  const generatePages = () => {
    if (totalPages <= maxVisiblePages) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | -1)[] = [];
    const first = 1;
    const last = totalPages;
    const sideCount = 1;
    const middleCount = maxVisiblePages - 2 * sideCount - 2;

    pages.push(first);

    let left = Math.max(currentPage - Math.floor(middleCount / 2), sideCount + 1);
    let right = Math.min(currentPage + Math.floor(middleCount / 2), totalPages - sideCount);

    if (left > sideCount + 1) pages.push(-1);
    else left = sideCount + 1;

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - sideCount) pages.push(-1);

    pages.push(last);

    return pages;
  };

  if (totalPages <= 1) return null;

  const pagesToShow = generatePages();

  return (
    <div className={`flex items-center justify-center space-x-2 mt-8 mb-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:hover:text-black/70 dark:disabled:hover:text-white/70 transition-colors"
        aria-label="Previous Page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <div className="relative inline-flex items-center gap-1">
        {pagesToShow.map((pageNum, i) =>
          pageNum === -1 ? (
            <span key={`dots-${i}`} className="px-2 text-black/40 dark:text-white/40">…</span>
          ) : (
            <button
              key={pageNum}
              ref={(el) => {
                if (el) buttonRefs.current[pageNum - 1] = el;
              }}
              onClick={() => onPageChange(pageNum)}
              className={`relative z-10 px-4 py-2 text-sm transition-colors rounded-lg ${
                pageNum === currentPage 
                  ? 'text-black font-semibold' 
                  : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {pageNum}
            </button>
          )
        )}

        {isMounted && (
          <motion.div
            layout
            initial={false}
            animate={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute h-full bg-primary rounded-lg z-0"
          />
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:hover:text-black/70 dark:disabled:hover:text-white/70 transition-colors"
        aria-label="Next Page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}
