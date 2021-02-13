import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { AuthModel } from '../shared/auth.model';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogingMode = true;
    isLoadingMode = false;
    errorStr: string = null;
    private storeSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnDestroy(): void {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth')
            .subscribe(authState => {
                this.isLoadingMode = authState.loading;
                this.errorStr = authState.authError;
                if (this.errorStr) {
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
            this.store.dispatch(new AuthActions.LoginStart(authData));
        } else {
            this.store.dispatch(new AuthActions.SignUpStart(authData));
        }
        authForm.reset();
    }
    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }
    private showErrorAlert(message: string) {
        // const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory
    }
}
