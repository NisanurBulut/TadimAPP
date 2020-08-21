import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dss: DataStorageService, private as: AuthService) { }

    ngOnInit() {
        this.userSub = this.as.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(this.isAuthenticated, user);
        });
    }
    onSaveData() {
        this.dss.storeRecipes();
    }
    onFetchData() {
        this.dss.fetchRecipes().subscribe();
    }
    logOut() { }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
