import { useGoals } from "../hooks/useGoals";
import Layout from "../components/Layout";
import GoalForm from "../components/goals/GoalForm";
import GoalCard from "../components/goals/GoalCard";
import { useGoalForm } from "../hooks/useGoalForm";

function Goals() {

  const {
    goals,
    loadGoals
} = useGoals();

const {

    formData,

    setFormData,

    editingId,

    categories,

    saveGoal,

    editGoal,

    deleteGoal

} = useGoalForm(loadGoals);

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Metas Financeiras
      </h1>

      <GoalForm
  formData={formData}
  setFormData={setFormData}
  categories={categories}
  editingId={editingId}
  onSave={saveGoal}
/>  

<div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">

  {goals.map((goal) => (
    
    <GoalCard
        key={goal.id}
        goal={goal}
        onEdit={editGoal}
        onDelete={deleteGoal}
    />
))}

</div>

    </Layout>
  );
}

export default Goals;