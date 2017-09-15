import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipesService: RecipesService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer test:1234');
    // return this.httpClient.put('https://ng-course-recipes.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {
    //   params: new HttpParams().set('auth', token),
    //   observe: 'body'
    //   // ,headers: headers
    // });
    const req = new HttpRequest('PUT', 'https://ng-course-recipes.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {
      params: new HttpParams().set('auth', token),
      reportProgress: true
    })
    return this.httpClient.request(req)
  }

  loadRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.get<Recipe[]>('https://ng-course-recipes.firebaseio.com/recipes.json?auth=' + token)
    return this.httpClient.get<Recipe[]>('https://ng-course-recipes.firebaseio.com/recipes.json', {
      params: new HttpParams().set('auth', token),
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          console.log(recipes)
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
