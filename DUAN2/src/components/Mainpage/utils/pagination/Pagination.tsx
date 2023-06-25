import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import "./Pagin.css";

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
    currentPage,
    paginate,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="paginationBox">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page_item">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="page_link"
                        >
                            <GrCaretPrevious />
                        </button>
                    </li>
                )}

                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page_item ${
                            number === currentPage ? "activeLink" : ""
                        }`}
                    >
                        <button
                            onClick={() => paginate(number)}
                            className="page_link"
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {currentPage < pageNumbers.length && (
                    <li className="page_item">
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="page_link"
                        >
                            <GrCaretNext />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
