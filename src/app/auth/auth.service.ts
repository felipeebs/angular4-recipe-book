import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as firebase from 'firebase';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  logOut() {
    this.router.navigate(['/']);
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
