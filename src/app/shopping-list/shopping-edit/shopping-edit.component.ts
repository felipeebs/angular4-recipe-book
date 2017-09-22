import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editingIndex: number;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editingIndex, ingredient: ingredient}))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }
    this.onClearForm();
  }

  onClearForm() {
    this.form.reset();
    this.editMode = false;
    delete this.editingIndex;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editingIndex));
    this.onClearForm();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
                            .subscribe((index: number) => {
                              this.editMode = true;
                              this.editingIndex = index;
                              const editingIngredient = this.shoppingListService.getIngredient(index);
                              this.form.setValue({
                                name: editingIngredient.name,
                                amount: editingIngredient.amount
                              });
                            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
