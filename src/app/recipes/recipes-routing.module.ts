import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { NoSelectComponent } from "./no-select/no-select.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { recipesResolver } from "./recipes-resolver.service";
import { AuthGuard } from "../auth/auth.guard";

const recipesRouting: Routes = [{
  path: '', canActivate: [AuthGuard], component: RecipesComponent, children: [
    { path: '', component: NoSelectComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent },
    { path: ':name', component: RecipesDetailsComponent, resolve: { detail: recipesResolver } },
    { path: ':name/edit', component: RecipeEditComponent },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(recipesRouting)],
  exports: [RouterModule]
})
export class RecipesRouterModule { }
