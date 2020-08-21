import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
        this.isLogingMode = true;
        if (!this.isLogingMode) {

        } else {
            const email = authForm.value.email;
            const password = authForm.value.password;
            this.as.signup(email, password).subscribe(resData => {
                this.isLoadingMode = false;
            }, errData => {
                this.isLoadingMode = false;
                this.errorStr = 'Bir hata ile karşılaşıldı.';
                console.log(this.errorStr);
            });
            authForm.reset();
        }
    }
}
