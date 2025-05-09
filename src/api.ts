import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getRecipeFromLlama(ingredients: string[]) {
    const prompt = `Tu es un assistant compétent en cuisine qui reçoit une liste d'ingrédients d'une personne et qui suggère une recette que cette personne peut réaliser avec quelques uns ou tous ces ingrédients. Tu n'as pas besoin d'utiliser chacun des ingrédients proposés. La recette peut inclure des ingrédients supplémentaires que la personne n'a pas mentionnés, mais essaye de ne pas inclure trop d'ingrédients supplémentaires. Tu essayes de faire des recettes originales, variés et populaires. Formatte ta réponse en Markdown pour la rendre plus facile à afficher sur une page web en mettant un saut de ligne avant et après chaque titre et sous-titre. Voici la liste d'ingrédients: ${ingredients}`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-4-maverick:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erreur: ', error);
        throw error;
    }
};