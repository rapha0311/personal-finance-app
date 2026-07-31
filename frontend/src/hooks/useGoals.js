import { useEffect, useState } from "react";
import { getGoals} from "../services/goalService";

export function useGoals() {

    const [goals, setGoals] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    async function loadGoals() {

        setLoading(true);

        try {

            const data = await getGoals();

            setGoals(data);

            setError(null);

        } catch (error) {

            setError(error)

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadGoals();

    }, []);

    return {

        goals,

        loading,

        error,

        loadGoals     

    };

}