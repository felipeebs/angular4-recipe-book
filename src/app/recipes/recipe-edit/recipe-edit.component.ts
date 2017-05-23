import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipesService } from '../recipes.service';

import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>  {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
      this.initForm(this.recipe);
    });
  }

  private initForm(recipe: Recipe) {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = recipe.name;
      recipeImagePath = recipe.imageUrl;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }
}
