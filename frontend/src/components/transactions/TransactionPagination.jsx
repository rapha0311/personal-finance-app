import ThemeButton from "../ThemeButton";

function TransactionPagination({

    pagination,

    filters,

    setFilters

}) {

    function goToPage(page) {

        if (
            page < 1 ||
            page > pagination.total_pages
        ) return;

        setFilters(prev => ({
            ...prev,
            page
        }));

    }

    return (

        <div className="flex items-center justify-between mt-6">

            <ThemeButton
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page === 1}
            >
                ← Anterior
            </ThemeButton>

            <span className="font-medium">

                Página {pagination.page} de {pagination.total_pages}

            </span>

            <ThemeButton
                onClick={() => goToPage(pagination.page + 1)}
                disabled={pagination.page === pagination.total_pages}
            >
                Próxima →
            </ThemeButton>

        </div>

    );

}

export default TransactionPagination;