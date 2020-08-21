import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    password: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }
    signup(pemail: string, ppassword: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.firebase.signUpURL + environment.firebase.apiKey, {
            email: pemail,
            password: ppassword,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError));
    }
    login(pemail: string, ppassword: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.firebase.loginURL + environment.firebase.apiKey, {
            email: pemail,
            password: ppassword,
            returnSecureToken: true
        }
        ).pipe(
            catchError(this.handleError));
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
