import { Component, ElementRef, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { IngredientModel, Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppingllist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: HTMLFormElement;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  ingredientEdit: Ingredient | null = null;
  editMode: boolean = false;
  private shoppingListSubscribe: Subscription

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.shoppingListSubscribe = this.shoppingListService.ingredientEdit.subscribe((ingredient) => {
      this.ingredientEdit = ingredient;
      this.editMode = true;
      const { name, amount } = ingredient;
      this.form.form.setValue({
        name, amount
      })
    })
  }

  onIngredientClear() {
    this.formReset()
  }

  onSubmit() {
    const { name, amount } = this.form.value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientEdit, { name, amount });
    } else {
      this.shoppingListService.addIngredient(new IngredientModel(name, amount))
    }
    this.formReset()
  }

  onIngredientDelete() {
    if (this.editMode && this.ingredientEdit) {
      this.shoppingListService.deleteIngredient(this.ingredientEdit);
    };
    this.formReset()
  }

  private formReset() {
    if (this.editMode) {
      this.editMode = false;
      this.ingredientEdit = null
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.shoppingListSubscribe.unsubscribe()
  }
}
