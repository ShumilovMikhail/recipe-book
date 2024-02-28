import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IRecipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { stringToUrl } from "../shared/common";

export const recipesResolver: ResolveFn<IRecipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const recipeService = inject(RecipeService);
  const recipes = recipeService.getRecipes();
  const isFind = recipes.find(recipe => stringToUrl(recipe.name) === route.params['name'])
  if (isFind) {
    return recipes
  }

  return inject(DataStorageService).getRecipes()
}

