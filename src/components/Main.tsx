import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import './Main.css';
import { useState } from "react";
import { CgAdd } from "react-icons/cg";

export default function Main() {
    const [ingredients, setIngredients] = useState<string[]>(["poulet", "champignons", "carottes"]);

    function addIngredient(formData: FormData) {
        const newIngredient = formData.get("ingredient")
        if (typeof newIngredient === "string") {
            setIngredients([...ingredients, newIngredient]);
        }
    }

    function resetIngredientsList() {
        if (window.confirm("Êtes-vous sûr de vouloir effacer la liste d'ingrédients ?")) {
            setIngredients([]);
        }
    }

    function removeLastIngredient(): void {
        setIngredients(prevState => prevState.slice(0, -1))
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredients-form">
                <label htmlFor="add-ingredient"> Ajouter un ingrédient:
                    <input
                        type="text" 
                        name="ingredient"
                        id="add-ingredient"
                        placeholder="ex: Champignons"
                        aria-label="Ajouter un ingrédient"
                    />
                </label>
                <button>
                    <CgAdd /> Ajouter
                </button>
            </form>

            {ingredients.length > 0 && <IngredientsList 
                ingredientsList={ingredients}
                resetIngredientsList={resetIngredientsList}
                removeLastIngredient={removeLastIngredient}
            />}

            <Recipe />
        </main>
    );
}