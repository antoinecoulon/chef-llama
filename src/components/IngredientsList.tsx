import "./IngredientsList.css"
import { CgChevronDoubleLeftO, CgTrash } from "react-icons/cg";

type IngredientsListProps = {
    ingredientsList: string[];
    resetIngredientsList: React.MouseEventHandler<HTMLButtonElement>;
    removeLastIngredient: React.MouseEventHandler<HTMLButtonElement>;
};

export default function IngredientsList({ ingredientsList, resetIngredientsList, removeLastIngredient }: IngredientsListProps) {
    return (
        <section className="ingredients-list">
            <ul>
                {ingredientsList.map((ingredient: string, idx: number) => (
                    <li key={idx}>{ingredient}</li>
                ))}
            </ul>

                <div className="buttons-container">
                    <button
                        onClick={removeLastIngredient}
                        className="remove-last-ingredients"
                    ><CgChevronDoubleLeftO /> Retirer le dernier ingrédient</button>
                    <button 
                        onClick={resetIngredientsList}
                        className="reset-btn"
                    ><CgTrash /> Effacer la liste d'ingrédients</button>
                </div>

            {ingredientsList.length > 2 && <div className="ask-recipe">
                <p>Une fois que vous avez sélectionné (au moins) 3 ingrédients, vous pouvez cliquer sur ce bouton pour obtenir votre recette:</p>
                <button>Obtenir une recette</button>
            </div>}
        </section>
    )
}