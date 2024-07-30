export interface IngredientI {
  _id?: string;
  name: string;
}

export interface IngredientResponseI {
  ingredients: IngredientI[];
  totalIngredients: number;
  totlaPages: number;
}
