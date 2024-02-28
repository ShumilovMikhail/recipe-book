import { Injectable, inject } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IRecipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";
import { catchError, exhaustMap, map, pluck, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

interface ResponseData {
  [key: string]: IRecipe
}

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);
  private API: string = 'https://recipe-book-c9125-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const response = this.http.put(this.API, recipes)
    response.subscribe((data) => data)
    return response;
  };

  getRecipes(): Observable<IRecipe[]> {
    const observable = this.http.get<IRecipe[]>(this.API).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      }),
    )
    observable.subscribe(recipes => recipes)
    return observable
  }
}
