import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
