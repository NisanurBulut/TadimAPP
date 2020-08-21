import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggingMode = true;
    constructor(private as: AuthService) { }
    onSwitchMode() {
        this.isLoggingMode = !this.isLoggingMode;
    }
    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        if (!this.isLoggingMode) {

        } else {
            const email = authForm.value.email;
            const password = authForm.value.password;
            this.as.signup(email, password).subscribe(resData => {
                console.log(resData);
            }, errData => {
                console.log(errData);
            });
            authForm.reset();
        }
    }
}
