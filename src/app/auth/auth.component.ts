import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './authresponsedata.interface';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLogingMode = true;
    isLoadingMode = false;
    errorStr: string = null;
    constructor(private as: AuthService, private router: Router) { }
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

        if (this.isLogingMode) {
            authObs = this.as.login(email, password);
        } else {
            authObs = this.as.signup(email, password);
            authForm.reset();
        }
        authObs.subscribe(resData => {
            this.isLoadingMode = false;
            this.router.navigate(['/recipes']);
        }, errData => {
            this.isLoadingMode = false;
            this.errorStr = errData;
        });
    }
}
