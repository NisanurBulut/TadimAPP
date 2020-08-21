import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLogingMode = true;
    isLoadingMode = false;
    errorStr: string = null;
    constructor(private as: AuthService) { }
    onSwitchMode() {
        this.isLogingMode = !this.isLogingMode;
    }
    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLogingMode = true;
        if (this.isLogingMode) {
            authObs = this.as.login(email, password);
        } else {
            authObs = this.as.signup(email, password);
            authForm.reset();
        }
        authObs.subscribe(resData => {
            this.isLoadingMode = false;
        }, errData => {
            this.isLoadingMode = false;
            this.errorStr = errData;
        });
    }
}
