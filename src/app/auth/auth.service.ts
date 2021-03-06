import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from './auth-response-data.interface';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.actions';

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

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new fromAuthActions.Logout());
        }, expirationDuration);
    }
    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}
