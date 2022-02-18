import React from "react";
import _ from "lodash";

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className='pagination'>
                {pages.map((page) => (
                    <li
                        className={
                            "mt-4 page-item " +
                            (page === currentPage ? "active" : "")
                        }
                        key={page}
                    >
                        <a
                            className='page-link'
                            role='button'
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
