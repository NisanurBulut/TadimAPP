import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
        });
    }
}
