import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import ReactMarkdown from "react-markdown";
import "./Recipe.css";

type RecipeProps = {
  recipe: string;
  loading: boolean;
};

export default function Recipe({ recipe, loading }: RecipeProps) {
  return (
    <section className="recipe">
      {recipe === "" && loading ? (
        <Quantum size="80" speed="1.75" color="var(--color-bg-primary)" />
      ) : (
        <ReactMarkdown>{recipe}</ReactMarkdown>
      )}
    </section>
  );
}
