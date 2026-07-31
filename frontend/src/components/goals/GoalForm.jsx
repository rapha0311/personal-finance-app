import ThemeCard from "../ThemeCard";
import ThemeInput from "../ThemeInput";
import ThemeButton from "../ThemeButton";
import ThemeSelect from "../ThemeSelect";


function GoalForm({
    formData,
    setFormData,
    categories,
    editingId,
    onSave
}) {

    function updateField(field, value) {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
}

    const formTitle =
    editingId
        ? "Editar Meta"
        : "Nova Meta";

    return (

        <ThemeCard className="p-6 mb-8">

            <h2 className="text-xl font-bold mb-4">
                {formTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <ThemeInput
                    placeholder="Título"
                    value={formData.title}
                    onChange={(e) =>
                        updateField("title", e.target.value)
                    }
                />

                <ThemeInput
                    type="number"
                    placeholder="Valor da Meta"
                    value={formData.target_amount}
                    onChange={(e) =>
                        updateField("target_amount", 
                            e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                        )
                    }
                />

                <ThemeInput
                    type="date"
                    value={formData.target_date}
                    onChange={(e) =>
                        updateField("target_date", e.target.value)                        
                    }
                />

                <ThemeSelect
                    value={formData.category_id}
                    onChange={(e) =>
                        updateField("category_id", 
                            e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                        )
                    }
                >

                    <option value="">
                        Selecione uma categoria
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

            </div>

            <ThemeButton
                color="green"
                className="mt-5 w-full md:w-auto"
                onClick={onSave}
            >

                {editingId ? "Atualizar" : "Salvar"}

            </ThemeButton>

        </ThemeCard>

    );

}

export default GoalForm;