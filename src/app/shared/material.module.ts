import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
