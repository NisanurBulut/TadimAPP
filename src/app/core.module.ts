import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListService } from './shopping-list';
import { RecipeService } from './recipes';
import { AuthInterceptorService } from './auth/auth-interceptor-service';


@NgModule({
  providers: [
      ShoppingListService,
      RecipeService,
      { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule { }
