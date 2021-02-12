import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor-service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';


@NgModule({
  providers: [
      ShoppingListService,
      RecipeService,
      { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule { }
