import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [12, 24, 48],
}) => {
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate intelligent pagination range with ellipses
  const getPageNumbers = () => {
    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 5; // 1, ellipsis, siblings, ellipsis, last

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, i) => leftSibling + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }

    return [];
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination-container" id="catalog-pagination">
      <div className="pagination-wrapper">
        <div className="pagination-info">
          Showing <strong>{startItem.toLocaleString()}</strong>–
          <strong>{endItem.toLocaleString()}</strong> of{' '}
          <strong>{totalItems.toLocaleString()}</strong> pets
          <span style={{ margin: '0 0.5rem', color: 'var(--border-strong)' }}>•</span>
          <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            id="pagination-first-btn"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="First page"
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            className="pagination-btn"
            id="pagination-prev-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  •••
                </span>
              );
            }

            const pageNum = p as number;
            return (
              <button
                key={pageNum}
                id={`pagination-page-${pageNum}`}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => onPageChange(pageNum)}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="pagination-btn"
            id="pagination-next-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>

          <button
            className="pagination-btn"
            id="pagination-last-btn"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last page"
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {onPageSizeChange && (
          <div className="pagination-size-selector">
            <label htmlFor="page-size-select">Per page:</label>
            <select
              id="page-size-select"
              className="pagination-select"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} pets
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
