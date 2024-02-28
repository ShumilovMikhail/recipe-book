import { InjectionToken, NgModule } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { ShoppingListService } from "./shopping-list/shoppingllist.service";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptorFn } from "./auth/auth.interceptor.service";
import { LoggingService } from "./logging.service";

export const URL_BASE_API = new InjectionToken<string>('URL_BASE_API')


@NgModule({
  providers: [ShoppingListService, RecipeService, provideHttpClient(withInterceptors([AuthInterceptorFn])), { provide: URL_BASE_API, useClass: ShoppingListService }],
})
export class CoreModule { }
