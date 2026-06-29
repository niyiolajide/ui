'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalItems === 0) {return null}

  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Showing {start}–{end} of {totalItems}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => { onPageChange(currentPage - 1); }}
            disabled={currentPage <= 1}
            aria-label={`Previous page (page ${currentPage - 1} of ${totalPages})`}
            className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-neutral-700 dark:text-neutral-300 tabular-nums px-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => { onPageChange(currentPage + 1); }}
            disabled={currentPage >= totalPages}
            aria-label={`Next page (page ${currentPage + 1} of ${totalPages})`}
            className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
