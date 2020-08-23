import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoadingSpinnerComponent,
        DropdownDirective
    ]
})
export class SharedModule { }
