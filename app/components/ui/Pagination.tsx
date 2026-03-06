"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

/**
 * Generates the array of page numbers (and ellipsis markers) to display.
 * Shows first, last, and a window around the current page.
 */
const getPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | "ellipsis-start" | "ellipsis-end")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

  // Always show page 1
  pages.push(1);

  if (currentPage > 3) {
    pages.push("ellipsis-start");
  }

  // Window around current page
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis-end");
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Update the sliding indicator position when the active page changes
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(page);
    const container = containerRef.current;
    if (activeBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-10 mb-4 select-none"
    >
      {/* Previous button */}
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-all duration-200 ${
          page === 1
            ? "text-white/20 cursor-not-allowed"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Page numbers with sliding indicator */}
      <div ref={containerRef} className="relative flex items-center gap-1">
        {/* Sliding active indicator */}
        <motion.div
          className="absolute top-0 h-9 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 209, 255, 0.15), rgba(22, 252, 169, 0.15))",
            border: "1px solid rgba(0, 218, 146, 0.3)",
          }}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />

        {pageNumbers.map((item, idx) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <span
                key={item}
                className="flex items-center justify-center w-9 h-9 text-white/40 text-sm"
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          const pageNum = item as number;
          const isActive = pageNum === page;

          return (
            <button
              key={pageNum}
              ref={(el) => {
                if (el) buttonRefs.current.set(pageNum, el);
              }}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
              className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-all duration-200 ${
          page === totalPages
            ? "text-white/20 cursor-not-allowed"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
