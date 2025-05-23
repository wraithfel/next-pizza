import { ingredients } from "@/prisma/constants";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

interface ReturnProps {
    ingredients: IngredientItem[],
    loading: boolean
}


export const useFilterIngredients = () : ReturnProps => {
    const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [set, { toggle }] = useSet(new Set<string>([]));
    
    React.useEffect(() => {
        async function fetchIngredients() {
            try{
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients.map((ingredient) => ({id: ingredient.id, name: ingredient.name})));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    return { ingredients, loading }
}