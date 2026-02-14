import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {LoginRequest} from '../../dto/auth/LoginRequest';
import * as AuthActions from '../../store/auth/actions.auth';
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../../store/auth/selectors.auth';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  loginForm: FormGroup;
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  private destroy$ = new Subject<void>();

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter methods for easy access to form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    // ...existing code...
  }

  ngOnDestroy() {
    // ...existing code...
  }

  submitLogin(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.store.dispatch(AuthActions.login(loginRequest));
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}

