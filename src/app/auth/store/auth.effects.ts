import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { AuthResponseData } from '../auth-response-data.interface';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const handleAuthentication = (authResponse: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +authResponse.expiresIn * 1000);
    const activeUser = new User(authResponse.email, authResponse.localId, authResponse.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(activeUser));
    return (new AuthActions.LoginSuccess(activeUser));
};

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
};

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
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
            if (loadedUser.token) {
                return new AuthActions.LoginSuccess(loadedUser);
            }
            return { type: 'DUMMY' };
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS, AuthActions.LOGOUT),
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
