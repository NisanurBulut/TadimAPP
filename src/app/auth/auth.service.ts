import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    password: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
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
        ).pipe(
            catchError(errRes => {
                let errMessage = 'Bilinmeyen bir hata ile karşılaşıldı.';
                if (!errRes.error || !errRes.error.error) {
                    return throwError(errMessage);
                }
                switch (errRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errMessage = 'Bu mail adresi zaten kayıtlıdır.';
                }
                return throwError(errMessage);
            }));
    }
}
