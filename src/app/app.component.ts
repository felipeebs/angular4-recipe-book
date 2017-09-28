import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from './store/app.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBUxW2LWWmQD4y7vjN4Ju_X8YpImjT_0Ns',
      authDomain: 'ng-course-recipes.firebaseapp.com'
    });
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      if (user) {
        this.store.dispatch(new AuthActions.Signin());
        user.getIdToken().then((token: string) => {
          this.store.dispatch(new AuthActions.SetToken(token));
        });
      }
    });
  }
}
