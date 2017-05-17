import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private shoppingListService: ShoppingListService) {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateUngredient(this.editingIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClearForm();
  }

  onClearForm() {
    this.form.reset();
    this.editMode = false;
    delete this.editingIndex;
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
