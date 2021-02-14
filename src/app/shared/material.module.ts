import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule,
      MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
