import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '../../../dto/UserResponse';
import {Store} from '@ngrx/store';
import {selectCurrentUser, selectIsAuthenticated} from '../../../store/auth/selectors.auth';
import {AsyncPipe} from '@angular/common';
import * as AuthActions from '../../../store/auth/actions.auth';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
   isAuthenticated$ :Observable<boolean>;
   user$ : Observable<UserResponse | null> ;

   constructor(private store : Store) {
      this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
      this.user$ = this.store.select(selectCurrentUser);
   }

   logout(): void {
     this.store.dispatch(AuthActions.logout());
   }
}
