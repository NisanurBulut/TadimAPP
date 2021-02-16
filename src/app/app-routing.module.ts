import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  {
    path: 'ingredient-list',
    loadChildren: './ingredients/ingredients.module#IngredientsModule',
    data: { bodyClass: 'ingredientList' }
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: { bodyClass: 'auth' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
