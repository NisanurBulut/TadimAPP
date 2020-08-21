import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent {
    constructor(private dss: DataStorageService) { }
    onSaveData() {
        this.dss.storeRecipes();
    }
    onFetchData() {
        this.dss.fetchRecipes().subscribe();
    }
}
