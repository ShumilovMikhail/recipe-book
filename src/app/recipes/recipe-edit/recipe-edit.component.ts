import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { stringToUrl } from '../../shared/common';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit {
  public recipeForm: FormGroup
  public recipe: IRecipe | null
  public editMode: boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private recipesService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const recipes = this.recipesService.getRecipes();
      this.recipe = recipes.find(recipe => stringToUrl(recipe.name) === params.name);
      this.editMode = Boolean(this.recipe.name);
    });
    this.recipe = this.recipe ? this.recipe : new Recipe('', '', '', [])
    this.createForm()
  }

  get ingredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onSave() {
    if (this.editMode) {
      this.recipesService.updateRecipe(this.recipe, this.recipeForm.value)
      this.editMode = false
    } else {
      this.recipesService.addRecipe(new Recipe(this.recipeForm.value['name'], this.recipeForm.value['description'], this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']))
    }
    this.router.navigate(['../../'], { relativeTo: this.route });
  }


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.editMode = false
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }))
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id)
  }


  private createForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      description: new FormControl(this.recipe.description, Validators.required),
      ingredients: new FormArray([]),
    })
    if (this.recipe.ingredients.length !== 0) {
      this.createControls()
    }
  }
  private createControls() {
    this.recipe.ingredients.forEach(ingredient => {
      (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      }))
    })
  }


}
