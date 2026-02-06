import React from 'react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  if (totalPages <= 1 && totalItems > 0) {
      // Optional: hide if only 1 page? The user's code didn't strictly say so, 
      // but usually desired. However, the user's code shows "Showing 1-X of Y" so maybe keep it?
      // But the buttons might be redundant. Logic below handles "disabled" buttons.
  }
  
  // Adapted user's logic
  const renderPageNumbers = () => {
    return [...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      const isFirst = page === 1;
      const isLast = page === totalPages;
      const isCurrent = page === currentPage;
      const isNearCurrent = page >= currentPage - 1 && page <= currentPage + 1;

      if (isFirst || isLast || isCurrent || isNearCurrent) {
        if (isFirst && currentPage > 3) {
          return (
            <React.Fragment key="start-group">
              <button
                className={`page-number ${currentPage === 1 ? "active" : ""}`}
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              <span className="ellipsis">...</span>
            </React.Fragment>
          );
        }

        if (isLast && currentPage < totalPages - 2) {
            // Logic fix: This block needs to likely render the LAST element at the end of loop.
            // But map runs in order. 
            // If we are at the LAST element, we just render it. The ellipsis should come BEFORE it if we skipped.
            // But the user's snippet returns the ellipsis AND the button when `isLast` is true.
            // This works because we only enter this block for `page == totalPages`.
          return (
            <React.Fragment key="end-group">
              <span className="ellipsis">...</span>
              <button
                className={`page-number ${isCurrent ? "active" : ""}`}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </React.Fragment>
          );
        }
        
        // This check handles skipping the middle ones?
        // Wait, the user's code: `if (!isNearCurrent && !isFirst && !isLast) return null;`
        // My main loop `if (isFirst || ...)` already filters.
        
        // Re-evaluating User's Logic structure:
        /*
          if (isFirst || isLast || isCurrent || isNearCurrent) {
             if (isFirst && currentPage > 3) { render 1 and ... }
             else if (isLast && currentPage < totalPages - 2) { render ... and last }
             else { render page }
          }
        */
        // There's a subtle bug in the user's logic if strictly copied:
        // If `isFirst` (page 1) is true. `currentPage > 3`. It returns `1` and `...`.
        // Then loop continues.
        // If `page` is 2. `isNearCurrent` is false (if curr > 3). `isFirst` false. `isLast` false. -> returns null.
        
        // If `isLast` (page N) is true. `currentPage < N-2`. returns `...` and `N`.
        
        // This looks roughly correct for a simple implementation.
        
        return (
          <button
            key={page}
            className={`page-number ${isCurrent ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      }
      return null;
    });
  };

  return (
    <div className="pagination footer-pagination">
      <span className="showing-info">
        Showing {totalItems === 0 ? 0 : startIndex + 1}-
        {endIndex} of {totalItems}
      </span>

      <div className="d-flex align-items-center">
        <button
          className="page-btn me-2"
          disabled={currentPage === 1 || totalPages === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {renderPageNumbers()}

        <button
          className="page-btn ms-2"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
