import React from "react";
import "../App.css";

const Pagination = ({
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Pre
        </button>
        <span className="pagination-text">
          Page {page} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <div className="pagination">
        <label>
          Items per page:
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default Pagination;
