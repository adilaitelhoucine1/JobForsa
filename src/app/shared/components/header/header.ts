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
   isMobileMenuOpen = false;

   constructor(private store : Store) {
      this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
      this.user$ = this.store.select(selectCurrentUser);
   }

   toggleMobileMenu(): void {
     this.isMobileMenuOpen = !this.isMobileMenuOpen;
   }

   closeMobileMenu(): void {
     this.isMobileMenuOpen = false;
   }

   logout(): void {
     this.store.dispatch(AuthActions.logout());
     this.closeMobileMenu();
   }
}
