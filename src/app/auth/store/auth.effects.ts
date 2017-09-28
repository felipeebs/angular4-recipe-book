import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
                   .ofType(AuthActions.DO_SIGNUP)
                   .map((action: AuthActions.DoSignup) => {
                     return action.payload;
                   })
                   .switchMap((authData: { username: string, password: string }) => {
                     return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
                   })
                   .switchMap(() => {
                     return fromPromise(firebase.auth().currentUser.getIdToken());
                   })
                   .mergeMap((token: string) => {
                     return [
                       {type: AuthActions.SIGNUP},
                       {type: AuthActions.SET_TOKEN, payload: token}
                     ]
                   });

  @Effect()
  authSignIn = this.actions$
                   .ofType(AuthActions.DO_SIGNIN)
                   .map((action: AuthActions.DoSignup) => {
                     return action.payload;
                   })
                   .switchMap((authData: { username: string, password: string }) => {
                     return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
                   })
                   .switchMap(() => {
                     return fromPromise(firebase.auth().currentUser.getIdToken());
                   })
                   .mergeMap((token: string) => {
                     return [
                       {type: AuthActions.SIGNIN},
                       {type: AuthActions.SET_TOKEN, payload: token}
                     ]
                   });

  constructor(private actions$: Actions) {}
}
