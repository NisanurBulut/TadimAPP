import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth-response-data.interface';
import { Store } from '@ngrx/store';
import * as fromApp from './store/auth.reducer';
import * as AuthActions from './store/auth.actions';
import { AuthModel } from '../shared/auth.model';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogingMode = true;
    isLoadingMode = false;
    errorStr: string = null;

    constructor(private as: AuthService, private store: Store<fromApp.State>) { }
    ngOnDestroy(): void {

    }

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

        const authData = { email: authForm.value.email, password: authForm.value.password } as AuthModel;

        if (this.isLogingMode) {
            this.store.dispatch(new AuthActions.LoginStart(authData))
        } else {
            this.store.dispatch(new AuthActions.SignUpStart(authData))
        }
        authForm.reset();
    }
    onHandleError() {
        this.errorStr = null;
    }
}
