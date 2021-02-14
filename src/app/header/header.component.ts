import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromRecipeActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dss: DataStorageService, private as: AuthService, private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.userSub = this.store.select('auth').pipe(map(appSate => {
            return appSate.user;
        })).subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }
    onSaveData() {
        this.dss.storeRecipes();
    }
    onFetchData() {
        this.store.dispatch(new fromRecipeActions.FetchRecipes());
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
