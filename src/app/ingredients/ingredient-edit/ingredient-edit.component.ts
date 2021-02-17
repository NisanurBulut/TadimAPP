import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


import * as fromApp from '../../store/app.reducer';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientsService } from '../ingredients.service';
import * as fromIngredientActions from '../store/ingredients.actions';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    // this.subscription = this.store.select('ingredientList').subscribe(stateData => {
    //   if (stateData.editedIngredientIndex > -1) {
    //     this.editMode = true;
    //     this.editedItem = stateData.editedIngredient;
    //     this.editedItemIndex = stateData.editedIngredientIndex;
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   } else {
    //     this.editMode = false;
    //   }
    // });

    // düzenlenmek istenen nesneye abona olalım
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.editMode = true;
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.store.dispatch(new fromIngredientActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new fromIngredientActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDeleteItem(item: Ingredient) {
    //  this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new fromIngredientActions.DeleteIngredient(item.id));
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
