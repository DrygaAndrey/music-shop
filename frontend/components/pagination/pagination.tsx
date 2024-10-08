import MyButton from "@/components/myButton/myButton";
import styles from "./styles.module.scss";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loadMore: () => void;
    loading: boolean;
}

function Pagination({ currentPage, totalPages, onPageChange, loadMore, loading }: PaginationProps) {
    const createPageNumbers = () => {
        const pages = [];
        if (currentPage > 3) pages.push(1); // Первая страница
        if (currentPage > 4) pages.push("...");

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(currentPage + 2, totalPages); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) pages.push("...");
        if (currentPage < totalPages - 2) pages.push(totalPages); // Последняя страница

        return pages;
    };

    const pages = createPageNumbers();

    return (
        <div className={styles.pagination}>
            {currentPage !== totalPages &&

                <MyButton onClick={loadMore} disabled={loading}>
                    <span className="material-symbols-outlined">
                        refresh
                    </span>
                </MyButton>

            }
            <div className={styles.pages}>
                {pages.map((page, index) =>
                    typeof page === "number" ? (
                        <MyButton
                            key={index}
                            onClick={() => onPageChange(page)}
                            disabled={page === currentPage || loading}
                        >
                            {page}
                        </MyButton>
                    ) : (
                        <span key={index} className="material-symbols-outlined">
                            more_horiz
                        </span>
                    )
                )}
            </div>
        </div>
    );
}

export default Pagination;