import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { NoSelectComponent } from "./no-select/no-select.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesRouterModule } from "./recipes-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipesDetailsComponent,
    RecipeEditComponent,
    RecipesListComponent,
    NoSelectComponent,
    RecipesItemComponent,
    RecipesComponent,
  ],
  imports: [
    RecipesRouterModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
})
export class RecipesModule { }
