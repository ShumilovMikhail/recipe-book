export interface Ingredient {
  name: string;
  amount: number;
}

export class IngredientModel implements Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  };
};
