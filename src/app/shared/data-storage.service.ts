import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipesService: RecipesService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-course-recipes.firebaseio.com/recipes.json', this.recipesService.getRecipes());
  }

  loadRecipes() {
    return this.http.get('https://ng-course-recipes.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipesService.setRecipes(recipes);
        }
      );
  }
}
