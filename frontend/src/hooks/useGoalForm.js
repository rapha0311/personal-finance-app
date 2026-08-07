import { useEffect, useState } from "react";

import {
    createGoal,
    updateGoal,
    removeGoal
} from "../services/goalService";

import {
    getCategories
} from "../services/categoryService";


export function useGoalForm(loadGoals) {

    const [editingId, setEditingId] = useState(null);

    const [categories, setCategories] = useState([]);


    const initialFormData = {

        title: "",

        target_amount: "",

        target_date: "",

        category_id: ""

    };


    const [formData, setFormData] = useState(initialFormData);


    async function loadCategories() {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

        }

    }


    useEffect(() => {

        loadCategories();

    }, []);


    function clearForm() {

        setEditingId(null);

        setFormData(initialFormData);

    }


    async function saveGoal() {

        try {

            const payload = {

                title: formData.title,

                target_amount: Number(formData.target_amount),

                target_date: formData.target_date || null,

                category_id: Number(formData.category_id)

            };


            if (editingId) {

                await updateGoal(
                    editingId,
                    payload
                );

            } else {

                await createGoal(
                    payload
                );

            }


            clearForm();

            await loadGoals();

        } catch (error) {

            console.error(error);

        }

    }


    function editGoal(goal) {

        setEditingId(goal.id);

        setFormData({

            title: goal.title,

            target_amount: goal.target_amount,

            target_date: goal.target_date ?? "",

            category_id: goal.category_id ?? ""

        });

    }


    async function deleteGoal(id) {

        try {

            if (

                !window.confirm(
                    "Deseja realmente excluir esta meta?"
                )

            ) return;


            await removeGoal(id);

            await loadGoals();

        } catch (error) {

            console.error(error);

        }

    }


    return {

        formData,

        setFormData,

        editingId,

        categories,

        saveGoal,

        editGoal,

        deleteGoal

    };

}