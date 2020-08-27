import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './auth-response-data.interface';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }
    signup(pemail: string, ppassword: string) {
        return this.http
            .post<AuthResponseData>(
                environment.firebase.signUpURL + environment.firebase.apiKey,
                {
                    email: pemail,
                    password: ppassword,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    login(pemail: string, ppassword: string) {
        return this.http
            .post<AuthResponseData>(
                environment.firebase.loginURL + environment.firebase.apiKey,
                {
                    email: pemail,
                    password: ppassword,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            //  this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.Login({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logOut() {
        //  this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    private handleAuthentication(
        pemail: string,
        puserId: string,
        ptoken: string,
        pexpiresIn: number
    ) {
        const pexpirationDate = new Date(new Date().getTime() + pexpiresIn * 1000);
        const user = new User(pemail, puserId, ptoken, pexpirationDate);
        // this.user.next(user);
        this.store.dispatch(new AuthActions.Login({
            email: pemail,
            userId: puserId,
            token: ptoken,
            expirationDate: pexpirationDate
        }));
        this.autoLogout(pexpiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }
}
