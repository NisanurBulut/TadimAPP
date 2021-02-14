import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import * as fromRecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {

    @Effect() loadRecipes$ = this.actions$
        .pipe(
            ofType<fromRecipeActions.LoadRecipes>(fromRecipeActions.LOAD_RECIPES),
            mergeMap(
                () => this.recipeService.getRecipes()
                    .pipe(
                        map(data => new fromRecipeActions.LoadRecipesSuccess(data)),
                        catchError((error) => of(new fromRecipeActions.LoadRecipesFail(error)))
                    )
            )
        );
    @Effect() addRecipe$ = this.actions$
        .pipe(
            ofType<fromRecipeActions.AddRecipe>(fromRecipeActions.ADD_RECIPE),
            mergeMap(
                (data) => this.recipeService.addRecipe(data.payload)
                    .pipe(
                        map(() => new fromRecipeActions.AddRecipeSuccess(data.payload)),
                        catchError((error) => of(new fromRecipeActions.AddRecipeFail(error)))
                    )
            )
        );

    constructor(private actions$: Actions, private recipeService: RecipeService, private dataStorageService: DataStorageService) { }
}
