import { Injectable } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
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
                        map(() => {
                            this.snackBarService.open('Recipe added succefully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromRecipeActions.AddRecipeSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open('Updated Recipe Successfully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromRecipeActions.AddRecipeFail(error));
                        })
                    )
            )
        );
    @Effect() updateRecipe$ = this.actions$
        .pipe(
            ofType<fromRecipeActions.UpdateRecipe>(fromRecipeActions.UPDATE_RECIPE),
            mergeMap(
                (data) => this.recipeService.updateRecipe(data.payload)
                    .pipe(
                        map(() => {
                            this.snackBarService.open('Updated Recipe Successfully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromRecipeActions.UpdateRecipeSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open(`${error.error} Failed`, 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromRecipeActions.UpdateRecipeFail(error));
                        })
                    )
            )
        );
    @Effect() deleteRecipe$ = this.actions$
        .pipe(
            ofType<fromRecipeActions.DeleteRecipe>(fromRecipeActions.DELETE_RECIPE),
            mergeMap(
                (data) => this.recipeService.deleteRecipe(data.payload)
                    .pipe(
                        map(() => {
                            this.snackBarService.open('Deleted Recipe', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromRecipeActions.DeleteRecipeSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open(`${error.error} Failed`, 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromRecipeActions.DeleteRecipeFail(error));
                        })
                    )
            )
        );
    constructor(private actions$: Actions, private recipeService: RecipeService, private snackBarService: MatSnackBar) { }
}
