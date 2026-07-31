import ThemeInput from "../ThemeInput";
import ThemeSelect from "../ThemeSelect";
import ThemeButton from "../ThemeButton";
import ThemeCard from "../ThemeCard";

function TransactionForm({

    formData,

    setFormData,

    categories,

    goals,

    editingId,

    onSave,

    onCancel

}) {    

    function parseNumber(value){

    if(value === "")
        return null;

    return Number(value);

}

    const isIncome =

        formData.transaction_type === "income";

    const showGoalField =

        isIncome

        &&

        formData.goal_id != null &&
        formData.goal_id !== "";

    function updateField(field, value) {

    setFormData(prev => ({
        ...prev,
        [field]: value
    }));

}

    const formTitle =

    editingId

    ?

    "Editar Transação"

    :

    "Nova Transação";

    const submitLabel =

    editingId

    ?

    "Atualizar"

    :

    "Salvar";

    return (
        

        <ThemeCard className="p-6">

            <h2 className="text-xl font-bold mb-4">
    {formTitle}
</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <ThemeInput
                    type="text"
                    placeholder="Título"
                    value={formData.title}
                    onChange={(e)=>

                        updateField(
                            "title",
                            e.target.value
                        )

                    }
                />

                <ThemeInput
                    type="number"
                    placeholder="Valor"
                    value={formData.amount}
                    onChange={(e)=>

                        updateField(
                            "amount",
                            parseNumber(e.target.value)
                        )

                    }
                />

                <ThemeSelect
                    value={formData.transaction_type}
                    onChange={(e)=>

                        updateField(
                            "transaction_type",
                            e.target.value
                        )

                    }
                >

                    <option value="income">
                        Receita
                    </option>

                    <option value="expense">
                        Despesa
                    </option>

                </ThemeSelect>

                <ThemeInput
                    type="date"
                    value={formData.transaction_date}
                    onChange={(e)=>

                        updateField(
                            "transaction_date",
                            e.target.value
                        )

                    }
                />

                <ThemeSelect
                    value={formData.category_id}
                    onChange={(e)=>

                        updateField(
                            "category_id",
                            parseNumber(e.target.value)
                        )

                    }
                >

                    <option value="">
                        Selecione
                    </option>

                    {(categories ?? []).map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >

                            {category.name}

                        </option>

                    ))}

                </ThemeSelect>

                {isIncome && (

    <ThemeSelect
        value={formData.goal_id ?? ""}
        onChange={(e)=>

            updateField(
                            "goal_id",
                            parseNumber(e.target.value)
                        )

        }
    >

        <option value="">
            Não aplicar em meta
        </option>

        {(goals ?? []).map(goal => (

            <option
                key={goal.id}
                value={goal.id}
            >

                {goal.title}

            </option>

        ))}

    </ThemeSelect>

)}

{showGoalField && (

    <ThemeInput

        type="number"

        placeholder="Valor destinado à meta"

        value={formData.goal_amount ?? ""}

        onChange={(e)=>

            updateField(
                            "goal_amount",
                            parseNumber(e.target.value)
                        )

        }

    />

)}

            </div>

            <div className="flex gap-2 mt-4">

                <ThemeButton
                    color="green"
                    onClick={onSave}
                >

                    {submitLabel}

                </ThemeButton>

                {

                    editingId && (

                        <ThemeButton
                            color="gray"
                            onClick={onCancel}
                        >

                            Cancelar

                        </ThemeButton>

                    )

                }

            </div>

        </ThemeCard>

    );

}

export default TransactionForm;