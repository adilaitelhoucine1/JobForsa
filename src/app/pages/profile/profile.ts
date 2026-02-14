import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../../dto/UserResponse';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsAuthenticated } from '../../store/auth/selectors.auth';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../components/page-header/page-header';
import { ProfileInfoComponent } from '../../components/profile-info/profile-info';
import * as AuthActions from '../../store/auth/actions.auth';
import { UpdateProfileRequest } from '../../dto/profile/UpdateProfileRequest';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, PageHeader, ProfileInfoComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<UserResponse | null>;
  isEditMode = false;
  profileForm: FormGroup;
  private currentUser: UserResponse | null = null;

  constructor(private store: Store, private fb: FormBuilder) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectCurrentUser).pipe(
      tap(user => {
        this.currentUser = user;
        if (user && !this.profileForm.dirty) {
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }, { emitEvent: false });
        }
      })
    );

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // No manual subscription needed - async pipe handles it
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit() {
    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email
      });
    }
    this.isEditMode = false;
  }

  saveProfile() {
    if (this.profileForm.valid && this.currentUser) {
      const updateData: UpdateProfileRequest = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email
      };

      this.store.dispatch(AuthActions.updateProfile({
        userId: this.currentUser.id,
        userData: updateData
      }));

      this.isEditMode = false;
    }
  }
}
