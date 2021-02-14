import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import * as fromRecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {

    @Effect() addPiItem$ = this.actions$
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
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType<fromRecipeActions.FetchRecipes>(fromRecipeActions.FETCH_RECIPES),
        mergeMap(
            (data) => this.dataStorageService.fetchRecipes()
                .pipe(
                    map((resData) => {
                        return resData.map(recipe => {
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                    }),
                    map(recipe => {
                        return new fromRecipeActions.SetRecipes(recipe);
                    }),
                    catchError(resError => {
                        return resError;
                    }
                    )
                )
        )
    );
    constructor(private actions$: Actions, private recipeService: RecipeService, private dataStorageService: DataStorageService) { }
}
