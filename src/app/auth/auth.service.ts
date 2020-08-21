import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { AuthResponseData } from './authresponsedata.interface';
import { User } from './user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new Subject<User>();

    constructor(private httpClient: HttpClient) { }

    signup(pemail: string, ppassword: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.firebase.signUpURL + environment.firebase.apiKey, {
            email: pemail,
            password: ppassword,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
            tap(tapRes => {
                this.handleAuthentication(tapRes.email, tapRes.localId, tapRes.idToken, +tapRes.expiresIn);
            }));
    }
    login(pemail: string, ppassword: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.firebase.loginURL + environment.firebase.apiKey, {
            email: pemail,
            password: ppassword,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
        tap(tapRes => {
            this.handleAuthentication(tapRes.email, tapRes.localId, tapRes.idToken, +tapRes.expiresIn);
        }));
    }
    private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getDate() + expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        console.log(user);
        this.user.next(user);
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errMessage = 'Bilinmeyen bir hata ile karşılaşıldı.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errMessage = 'Bu mail adresi zaten kayıtlıdır.';
                break;
            case 'INVALID_EMAIL':
                errMessage = 'Bu mail adresi tanımlı değildir.';
                break;
            case 'INVALID_PASSWORD':
                errMessage = 'Bu parola tanımlı değildir.';
                break;
        }
        return throwError(errMessage);
    }
}
