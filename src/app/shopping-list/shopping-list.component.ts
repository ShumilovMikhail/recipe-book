import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingllist.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  public ingredients: Ingredient[]
  private shoppingListSubscribe: Subscription

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListSubscribe = this.shoppingListService.ingredientChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })

    this.loggingService.printLog('Shopping-list')
  };

  onIngredientEdit(id: number) {
    const ingredient = this.ingredients[id];
    this.shoppingListService.ingredientEdit.next(ingredient);
  };

  ngOnDestroy(): void {
    this.shoppingListSubscribe.unsubscribe();
  };
};
