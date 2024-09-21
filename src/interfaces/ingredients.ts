export interface IngredientI {
  id?: string;
  name: string;
}

export interface IngredientsResponseI {
  ingredients: IngredientI[];
  total: number;
  pages: number;
}

export interface IngredientResponseI {
  ingredient: IngredientI;
  message: String;
}
