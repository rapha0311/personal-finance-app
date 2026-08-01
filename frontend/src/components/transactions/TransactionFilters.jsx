import ThemeInput from "../ThemeInput";
import ThemeSelect from "../ThemeSelect";
import ThemeCard from "../ThemeCard";

function TransactionFilters({

    filters,

    setFilters,

    categories

}) {

    function updateFilter(field, value) {

        setFilters(prev => ({

            ...prev,

            [field]: value

        }));

    }

    return (

        <ThemeCard className="p-6 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <ThemeInput
                    placeholder="Pesquisar..."
                    value={filters.search}
                    onChange={(e) =>
                        updateFilter(
                            "search",
                            e.target.value
                        )
                    }
                />

                <ThemeSelect
                    value={filters.transaction_type}
                    onChange={(e) =>
                        updateFilter(
                            "transaction_type",
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Todos
                    </option>

                    <option value="income">
                        Receita
                    </option>

                    <option value="expense">
                        Despesa
                    </option>

                </ThemeSelect>

                <ThemeSelect
                    value={filters.category_id}
                    onChange={(e) =>
                        updateFilter(
                            "category_id",
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Todas categorias
                    </option>

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >

                            {category.name}

                        </option>

                    ))}

                </ThemeSelect>

                <ThemeInput
                    type="date"
                    value={filters.start_date}
                    onChange={(e) =>
                        updateFilter(
                            "start_date",
                            e.target.value
                        )
                    }
                />

                <ThemeInput
                    type="date"
                    value={filters.end_date}
                    onChange={(e) =>
                        updateFilter(
                            "end_date",
                            e.target.value
                        )
                    }
                />

            </div>

        </ThemeCard>

    );

}

export default TransactionFilters;