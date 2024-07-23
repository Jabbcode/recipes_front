export interface IRecipe {
  _id?: string;
  title: string;
  description: string;
  ingredients: any;
}

export interface BodyIngredientRecipe {
  _id?: string;
  name: Ingredient;
  quantity: number;
  unit: Unit;
}

export interface Ingredient {
  _id?: string;
  name: string;
}

export interface Unit {
  _id?: string;
  name: string;
  description: string;
}