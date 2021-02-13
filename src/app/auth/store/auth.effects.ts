import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { AuthResponseData } from '../auth-response-data.interface';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

const handleAuthentication = (authResponse: AuthResponseData) => {
    const expirationDate = new Date(
        new Date().getTime() + +authResponse.expiresIn * 1000);
    return of(new AuthActions.LoginSuccess({
        email: authResponse.email,
        userId: authResponse.localId,
        token: authResponse.idToken,
        expirationDate: expirationDate
    }))
}

const handleError = (errorRes: any) => {
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

@Injectable()
export class AuthEffects {

    @Effect() authLogin$ = this.actions$
        .pipe(
            ofType<AuthActions.LoginStart>(AuthActions.LOGIN_START),
            mergeMap(
                (data) => this.authService.login(data.payload.email, data.payload.password)
                    .pipe(
                        map((resData: AuthResponseData) => {
                            return handleAuthentication(resData);
                        }),
                        catchError(errorRes => {
                            return handleError(errorRes);
                        }
                        ))
            )
        );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType<AuthActions.LoginSuccess>(AuthActions.LOGIN_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType<AuthActions.SignUpStart>(AuthActions.SIGNUP_START),
        mergeMap(
            (data) => this.authService.signup(data.payload.email, data.payload.password)
                .pipe(
                    map((resData) => {
                        return handleAuthentication(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    }
                    ))
        )
    );
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }
}


/**
 *
 * pipe(
                map((resData)=>{
                    const authModel= {email:resData.email, password:resData.password} as AuthModel;
                    return of(new AuthActions.SignUpSuccess(authModel))
                }),
                catchError((error)=>{
                    return of(new AuthActions.SignUpFail(error));
                })
            ));
 */