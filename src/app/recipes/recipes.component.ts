import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, } from '@angular/core';
import { IRecipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  recipeSelected: IRecipe;

}
