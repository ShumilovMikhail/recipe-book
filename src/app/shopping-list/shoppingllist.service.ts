import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient, IngredientModel } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredientEdit = new Subject<Ingredient>()
  public ingredientChanged = new Subject<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new IngredientModel('Apples', 12),
    new IngredientModel('Tomatos', 15)
  ];

  public getIngredients(): Ingredient[] {
    return [...this.ingredients];
  };

  public addIngredient(ingredient: Ingredient) {
    const findIngredient = this.ingredients.find(item => item.name === ingredient.name);
    if (findIngredient) {
      findIngredient.amount = ingredient.amount
    } else {
      this.ingredients.push(ingredient)
    }
    this.ingredientChanged.next([...this.ingredients])
  };

  public updateIngredient(oldIngredient: Ingredient, newIngredient: Ingredient) {
    const findIngredient = this.ingredients.find(item => item.name === oldIngredient.name);
    if (findIngredient) {
      findIngredient.name = newIngredient.name
      findIngredient.amount = newIngredient.amount
      this.ingredientChanged.next([...this.ingredients])
    }
  }

  public deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(item => item !== ingredient);
    this.ingredientChanged.next(this.ingredients)
  }
};
