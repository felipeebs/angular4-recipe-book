import { Component, OnDestroy, OnInit } from '@angular/core';

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
  subscription: Subscription;
  editMode = false;
  editingIndex: number;

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
                              const ingredient = this.shoppingListService.getIngredient(index);
                              console.log(ingredient);
                            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
