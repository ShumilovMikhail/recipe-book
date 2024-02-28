import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IRecipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shoppingllist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { stringToUrl } from '../../shared/common';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss'
})
export class RecipesDetailsComponent implements OnInit {
  recipe: IRecipe
  collapsed: boolean = false

  constructor(private recipesService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe)
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    const recipes = this.route.snapshot.data['detail']
    this.route.params.subscribe(params => {
      console.log(recipes)
      this.recipe = recipes.find(recipe => stringToUrl(recipe.name) == params['name'])
    })
  }

  public onToShoppingList() {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients)
  }
};
