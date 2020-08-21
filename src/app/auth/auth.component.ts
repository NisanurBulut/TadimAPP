import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggingMode = true;
    onSwitchMode() {
        this.isLoggingMode = !this.isLoggingMode;
    }
    onSubmit(authForm: NgForm) {
        authForm.reset();
    }
}
