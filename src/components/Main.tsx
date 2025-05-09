import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import "./Main.css";
import { useEffect, useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { getRecipeFromLlama } from "../api";

export default function Main() {
  const [ingredients, setIngredients] = useState<string[]>([
    "poulet",
    "champignons",
    "carottes",
  ]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const recipeSection = useRef<HTMLDivElement | null>(null);

  function addIngredient(formData: FormData) {
    const newIngredient = formData.get("ingredient");
    if (typeof newIngredient === "string") {
      setIngredients([...ingredients, newIngredient]);
    }
  }

  async function generateRecipe() {
    setLoading(true);
    try {
      const generatedRecipe = await getRecipeFromLlama(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      setRecipe(`Erreur: ${error}`);
    }
    setLoading(false);
  }

  function resetIngredientsList() {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir effacer la liste d'ingrédients ?"
      )
    ) {
      setIngredients([]);
    }
  }

  function removeLastIngredient(): void {
    setIngredients((prevState) => prevState.slice(0, -1));
  }

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  return (
    <main>
      <form action={addIngredient} className="add-ingredients-form">
        <label htmlFor="add-ingredient">
          {" "}
          Ajouter un ingrédient:
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

      {ingredients.length > 0 && (
        <IngredientsList
          ingredientsList={ingredients}
          resetIngredientsList={resetIngredientsList}
          removeLastIngredient={removeLastIngredient}
          getRecipe={generateRecipe}
          loading={loading}
          ref={recipeSection}
        />
      )}

      <Recipe recipe={recipe} loading={loading} />
    </main>
  );
}
