import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromRecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {

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
    constructor(private actions$: Actions, private dataStorageService: DataStorageService) { }
}
