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

    const start =
    (pagination.page - 1) * pagination.page_size + 1;

    const end = Math.min(
        pagination.page * pagination.page_size,
        pagination.total
    );

    return (

        <div className="flex items-center justify-between mt-6">

            <ThemeButton
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page === 1}
            >
                ← Anterior
            </ThemeButton>

            <div className="text-center">

    <p className="font-medium">

        Página {pagination.page} de {pagination.total_pages}

    </p>

    <p className="text-sm text-gray-500">

        Mostrando {start}–{end} de {pagination.total} registros

    </p>

</div>

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