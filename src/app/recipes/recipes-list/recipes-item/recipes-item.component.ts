import { Component, Input } from '@angular/core';
import { IRecipe } from '../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { stringToUrl } from '../../../shared/common';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrl: './recipes-item.component.scss'
})
export class RecipesItemComponent {
  @Input() recipe: IRecipe;

  getUrl(): string {
    return stringToUrl(this.recipe.name)
  }
};
