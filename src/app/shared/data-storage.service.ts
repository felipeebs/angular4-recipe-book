import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';

@Injectable()
export class DataStorageService {
  constructor(private  http: Http, private recipesService: RecipesService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-course-recipes.firebaseio.com/recipes.json', this.recipesService.getRecipes());
  }

  loadRecipes() {
    return this.http.get('https://ng-course-recipes.firebaseio.com/recipes.json')
      .subscribe(
        (response: Response) => {
          const recipes = response.json();
          this.recipesService.setRecipes(recipes);
        }
      );
  }
}
