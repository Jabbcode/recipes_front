export interface IngredientI {
  _id?: string;
  name: string;
}

export interface IngredientsResponseI {
  ingredients: IngredientI[];
  totalIngredients: number;
  totalPages: number;
}

export interface IngredientResponseI {
  ingredient: IngredientI;
  message: String;
}
