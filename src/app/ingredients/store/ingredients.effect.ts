import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { IngredientsService } from '../ingredients.service';
import * as fromIngredientsActions from './ingredients.actions';

@Injectable()
export class IngredientEffects {
    @Effect() loadIngredients$ = this.actions$
        .pipe(
            ofType<fromIngredientsActions.LoadIngredients>(fromIngredientsActions.LOAD_INGREDIENTS),
            mergeMap(
                () => this.ingredientsService.getIngredients()
                    .pipe(
                        map(data => new fromIngredientsActions.LoadIngredientsSuccess(data)),
                        catchError((error) => of(new fromIngredientsActions.LoadIngredientsFail(error)))
                    )
            )
        );
    @Effect() addIngredient$ = this.actions$
        .pipe(
            ofType<fromIngredientsActions.AddIngredient>(fromIngredientsActions.ADD_INGREDIENT),
            mergeMap(
                (data) => this.ingredientsService.addIngredient(data.payload)
                    .pipe(
                        map(() => {
                            this.snackBarService.open('Ingredient added succefully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromIngredientsActions.AddIngredientSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open('Updated Ingredient Successfully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromIngredientsActions.AddIngredientFail(error));
                        })
                    )
            )
        );
    @Effect() updateIngredient$ = this.actions$
        .pipe(
            ofType<fromIngredientsActions.UpdateIngredient>(fromIngredientsActions.UPDATE_INGREDIENT),
            mergeMap(
                (data) => this.ingredientsService.updateIngredient(data.payload)
                    .pipe(
                        map(() => {
                            this.snackBarService.open('Updated Ingredient Successfully', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromIngredientsActions.UpdateIngredientSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open(`${error.message} Failed`, 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromIngredientsActions.UpdateIngredientFail(error));
                        })
                    )
            )
        );
    @Effect() deleteIngredient$ = this.actions$
        .pipe(
            ofType<fromIngredientsActions.DeleteIngredient>(fromIngredientsActions.DELETE_INGREDIENT),
            mergeMap(
                (data) => this.ingredientsService.deleteIngredient(data.payload)
                    .pipe(
                        map(() => {
                            this.snackBarService.open('Deleted Ingredient', 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return new fromIngredientsActions.DeleteIngredientSuccess(data.payload);
                        }),
                        catchError((error) => {
                            this.snackBarService.open(`${error.message} Failed`, 'Successfully', {
                                duration: 500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                            });
                            return of(new fromIngredientsActions.DeleteIngredientFail(error));
                        })
                    )
            )
        );
    constructor(private actions$: Actions, private ingredientsService: IngredientsService, private snackBarService: MatSnackBar) { }
}
