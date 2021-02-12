import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


import * as fromApp from '../../store/app.reducer';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as shoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });

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
      // güncelle
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // ekleme yap
      //  this.slService.addIngredient(newIngredient);
      // dispathch
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
  onDeleteItem() {
    //  this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
