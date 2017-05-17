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
  editingIngretient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  addCurrentIngredient(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    form.reset();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
                            .subscribe((index: number) => {
                              this.editMode = true;
                              this.editingIndex = index;
                              this.editingIngretient = this.shoppingListService.getIngredient(index);
                              this.form.setValue({
                                name: this.editingIngretient.name,
                                amount: this.editingIngretient.amount
                              });
                            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
