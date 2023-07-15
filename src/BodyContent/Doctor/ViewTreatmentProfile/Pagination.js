import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Render the "Start" choice
    pageNumbers.push(
      <li key="start">
        <a href="#" onClick={() => onPageChange(1)}>
          Start
        </a>
      </li>
    );

    // Calculate the nearest page indexes to the current page
    const nearbyIndexes = [];
    const startIndex = Math.max(currentPage - 1, 1);
    const endIndex = Math.min(currentPage + 1, totalPages);
    for (let i = startIndex; i <= endIndex; i++) {
      nearbyIndexes.push(i);
    }

    // Render the page numbers
    nearbyIndexes.forEach((pageNumber) => {
      pageNumbers.push(
        <li key={pageNumber}>
          <a
            href="#"
            onClick={() => onPageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </a>
        </li>
      );
    });

    // Render the "End" choice
    pageNumbers.push(
      <li key="end">
        <a href="#" onClick={() => onPageChange(totalPages)}>
          End
        </a>
      </li>
    );

    return pageNumbers;
  };

  return <ul className="pagination">{renderPageNumbers()}</ul>;
}

export default Pagination;
