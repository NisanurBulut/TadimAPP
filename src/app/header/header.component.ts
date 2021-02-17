import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;
    private activeUser: User;
    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.userSub = this.store.select('auth').pipe(map(appSate => {
            return appSate.user;
        })).subscribe(user => {
            this.activeUser = user;
            this.isAuthenticated = !!user;
        });
    }

    logOut() {
        this.store.dispatch(new AuthActions.Logout());
    }
    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}
