import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth-response-data.interface';
import { AuthService } from '../auth.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    @Effect() authLogin$ = this.actions$
        .pipe(
            ofType<AuthActions.LoginStart>(AuthActions.LOGIN_START),
            mergeMap(
                (data) => this.authService.login(data.payload.email,data.payload.password)
                    .pipe(
                        map((resData) =>{
                            const expirationDate = new Date(
                                new Date().getTime() + +resData.expiresIn * 1000);
                                return of(new AuthActions.Login({
                                    email: resData.email,
                                    userId: resData.localId,
                                    token: resData.idToken,
                                    expirationDate: expirationDate
                                }))
                        }),
                        catchError(errorRes => {
                            debugger;
                            let errorMessage = 'An unknown error occurred!';
                            if (!errorRes.error || !errorRes.error.error) {
                                return of(new AuthActions.LoginFailed(errorMessage));
                            }
                            switch (errorRes.error.error.message) {
                                case 'EMAIL_EXISTS':
                                    errorMessage = 'This email exists already';
                                    break;
                                case 'EMAIL_NOT_FOUND':
                                    errorMessage = 'This email does not exist.';
                                    break;
                                case 'INVALID_PASSWORD':
                                    errorMessage = 'This password is not correct.';
                                    break;
                            }
                            return of(new AuthActions.LoginFailed(errorMessage));
                        }
                    ))
            )
        );


    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService:AuthService) { }
}