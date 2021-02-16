import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor-service';
import { RecipeService } from './recipes/recipe.service';
import { IngredientsService } from './ingredients/ingredients.service';


@NgModule({
  providers: [
    IngredientsService,
      RecipeService,
      { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule { }
