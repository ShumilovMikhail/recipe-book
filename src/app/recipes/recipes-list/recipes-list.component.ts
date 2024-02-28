import { Component, OnDestroy, OnInit } from '@angular/core';


import { IRecipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: IRecipe[];
  private recipeServiceSubscription: Subscription
  constructor(private recipesServices: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipesServices.getRecipes()
    this.recipeServiceSubscription = this.recipesServices.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes
    })
  }

  ngOnDestroy(): void {
    this.recipeServiceSubscription.unsubscribe()
  }
}
