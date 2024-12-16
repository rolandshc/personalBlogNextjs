import React from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Pagination Navigation">
      <ul
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center", // Center pagination in the middle
          listStyleType: "none", // Remove default bullets
          padding: 0, // Remove padding
          margin: 0, // Remove margin
        }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="pagination-item"
            style={{
              margin: "0 5px", // Add spacing between items
            }}
          >
            <button
              onClick={() => paginate(number)}
              className="pagination-link text-gray-900 dark:text-white dark:hover:text-blue-400"
              style={{
                border: "1px solid gray", // Add a border to buttons
                background: "none",
                cursor: "pointer",
                padding: "8px 12px", // Add padding for clickable area
                borderRadius: "4px", // Round the corners
              }}
              aria-label={`Go to page ${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
  

export default Pagination;
