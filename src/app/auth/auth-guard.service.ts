import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
// export class AuthGuard implements CanActivate, CanLoad {
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
               .take(1)
               .map((authState: fromAuth.State) => {
                 return authState.isAuthenticated;
               });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
               .take(1)
               .map((authState: fromAuth.State) => {
                 return authState.isAuthenticated;
               });
  }
}
