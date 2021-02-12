import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth-response-data.interface';
import { Store } from '@ngrx/store';
import * as fromApp from './store/auth.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLogingMode = true;
    isLoadingMode = false;
    errorStr: string = null;

    constructor(private as: AuthService, private store: Store<fromApp.State>) { }

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState=>{
            this.isLoadingMode=authState.loading;
            this.errorStr=authState.authError;
            if(this.errorStr){
                alert(this.errorStr);
            }
        });
    }
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
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }))
        } else {
            authObs = this.as.signup(email, password);
        }
        authForm.reset();
    }
    onHandleError() {
        this.errorStr = null;
    }
}
