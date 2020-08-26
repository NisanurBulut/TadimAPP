import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangedsub: Subscription;
  // inject edilir servis
  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.igChangedsub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });
  }
  ngOnDestroy(): void {
   // this.igChangedsub.unsubscribe();
  }
  onEditItem(index: number) {
    // bu değeri emit edelim
    this.slService.startedEditing.next(index);
  }
}
