import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory as deleteCategoryService,
} from "../services/categoryService";
import ThemeInput from "../components/ThemeInput";
import ThemeSelect from "../components/ThemeSelect";
import ThemeButton from "../components/ThemeButton";
import ThemeCard from "../components/ThemeCard";
import ThemeTable from "../components/ThemeTable";
import { useConfirm } from "../hooks/useConfirm";

function Categories() {

  const { confirm } = useConfirm();

  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);  

  const initialFormData = {
    name: "",
    type: "expense",
};

const [formData, setFormData] = useState(initialFormData);

const categoryTypeLabel = Object.freeze({
    income: "Receita",
    expense: "Despesa",
});

const cellClass = "text-left p-3";

  async function fetchCategories() {
    try {
        const data = await getCategories();
        setCategories(data);
    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

function updateField(field, value) {

    setFormData(prev => ({
        ...prev,
        [field]: value
    }));

}

  useEffect(() => {

    fetchCategories();

  }, []);

  function clearForm() {

    setFormData(initialFormData);

    setEditingId(null);

}

  async function handleSaveCategory() {

    try {

      if (editingId) {

        await updateCategory(
          editingId,
          formData,
        );

      } else {

        await createCategory(formData);

      }      

      clearForm();

      await fetchCategories();

    } catch (error) {

      console.error(
          "Erro ao salvar categoria:",
          error
      );

    }

  }

  async function handleDeleteCategory(id) {

    if (!confirm())
      return;

    try {

        await deleteCategoryService(id);

        await fetchCategories();

    } catch (error) {

        console.error("Erro ao excluir categoria:", error);

    }

}

  function handleEditCategory(category) {

    setFormData({

    name: category.name,
    type: category.type

});

    setEditingId(category.id);
  }

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Categorias
      </h1>

      {/* formulário */}

      <ThemeCard className="p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-bold mb-4">

          {editingId
            ? "Editar Categoria"
            : "Nova Categoria"}

        </h2>

        <div className="grid grid-cols-2 gap-4">

          <ThemeInput
            type="text"
            placeholder="Nome"
            className="border p-3 rounded"
            value={formData.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
          />

          <ThemeSelect
            className="border p-3 rounded"
            value={formData.type}
            onChange={(e) =>
              updateField("type", e.target.value)
            }
          >
            <option value="income">
              Receita
            </option>

            <option value="expense">
              Despesa
            </option>

          </ThemeSelect>

          <ThemeButton
            onClick={handleSaveCategory}
            color="green"
          >
            {editingId
              ? "Atualizar"
              : "Salvar"}
          </ThemeButton>

        </div>

      </ThemeCard>

      {/* tabela */}

      <ThemeCard className="rounded-xl shadow p-6">

        <ThemeTable>

          <thead>

            <tr className="border-b">

              <th className={cellClass}>
                Nome
              </th>

              <th className={cellClass}>
                Tipo
              </th>

              <th className={cellClass}>
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map(category => (

              <tr
                key={category.id}
                className="border-b"
              >

                <td className="p-3">
                  {category.name}
                </td>

                <td className="p-3">

                  {categoryTypeLabel[category.type]}

                </td>

                <td className="p-3">

                  <div className="flex gap-2">

                    <ThemeButton
                      onClick={() =>
                        handleEditCategory(category)
                      }
                      color="yellow"
                    >
                      Editar
                    </ThemeButton>

                    <ThemeButton
                      onClick={() =>
                        handleDeleteCategory(category.id)
                      }
                      color="red"
                    >
                      Excluir
                    </ThemeButton>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </ThemeTable>

      </ThemeCard>

    </Layout>
  );
}

export default Categories;