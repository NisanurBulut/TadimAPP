import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

    private tokenExpirationTimer: any;
    constructor(private http: HttpClient,
                private store: Store<fromApp.AppState>) { }

    signup(pemail: string, ppassword: string) {
        return this.http
            .post<AuthResponseData>(
                environment.firebase.signUpURL + environment.firebase.apiKey,
                {
                    email: pemail,
                    password: ppassword,
                    returnSecureToken: true
                }
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
            this.store.dispatch(new AuthActions.LoginSuccess({
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
        this.store.dispatch(new AuthActions.Logout());
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
}
