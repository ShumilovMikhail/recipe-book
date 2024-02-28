import { Injectable, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shoppingllist.service';
import { IRecipe, Recipe } from './recipe.model';
import { Ingredient, IngredientModel } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: IRecipe[] = [new Recipe('burger', 'BUGReEEER', 'https://img1.russianfood.com/dycontent/images_upl/261/big_260886.jpg', [new IngredientModel('Meat', 12), new IngredientModel('Bread', 15)]),
  new Recipe('nuggets Box', 'One love', 'https://img1.russianfood.com/dycontent/images_upl/261/big_260886.jpg', [new IngredientModel('Potato', 12), new IngredientModel('Petuh Meat', 17)])];
  public recipesChanged = new Subject<Recipe[]>()
  constructor(private shoppingListService: ShoppingListService) { };


  public getRecipes(): IRecipe[] {
    return [...this.recipes];
  };

  public addIngredientToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient)
    })
  }

  public addRecipe(recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes)
  }

  public updateRecipe(oldRecipe: IRecipe, newRecipe: IRecipe) {
    const findRecipe = this.recipes.find(recipe => recipe === oldRecipe);
    if (findRecipe) {
      newRecipe.ingredients.map(ingredient => {
        return new IngredientModel(ingredient.name, ingredient.amount)
      })
      Object.assign(findRecipe, newRecipe)
    }
  }

  public deleteRecipe(recipe: IRecipe) {
    this.recipes = this.recipes.filter(item => item !== recipe);
    this.recipesChanged.next(this.recipes)
  }

  setRecipes(recipes: IRecipe[]): void {
    console.log(1)
    this.recipes = recipes
    this.recipesChanged.next(recipes)
  }
};
