import { Ingredient } from "../shared/ingredient.model";

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[]
};

export class Recipe implements IRecipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[]

  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients
  };
};
