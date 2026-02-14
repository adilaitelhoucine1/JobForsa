import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {map, Observable, tap} from 'rxjs';
import {LoginRequest} from '../dto/auth/LoginRequest';
import {RegisterRequest} from '../dto/auth/RegisterRequest';
import {UserResponse} from '../dto/UserResponse';
import {UpdateProfileRequest} from '../dto/profile/UpdateProfileRequest';
import {isPlatformBrowser} from '@angular/common';


@Injectable({
  providedIn:'root'
})
export class AuthService{
 private apiUrl ='http://localhost:3000/users'
 private isBrowser: boolean;

  constructor(
    private http:HttpClient,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http.get<User[]>(this.apiUrl).pipe(
     map(users => {
        const user = users.find(u =>
         u.email === loginRequest.email &&
         u.password === loginRequest.password
       );

       if (!user) {
         throw new Error('Invalid credentials');
       }

       const { password, ...userResponse } = user;
       return userResponse as UserResponse;
     }),
     tap(userResponse => this.saveToStorage(userResponse))
   );
 }

  register(registerRequest: RegisterRequest): Observable<UserResponse> {
    const newUser: User = {
      id: Math.floor(Math.random() * 10000),
      ...registerRequest
    };

    return this.http.post<User>(this.apiUrl, newUser).pipe(
      map(createdUser => {
        const { password, ...userResponse } = createdUser;
        return userResponse as UserResponse;
      }),
      tap(userResponse => this.saveToStorage(userResponse))
    );
  }

  updateProfile(userId: number, userData: UpdateProfileRequest): Observable<UserResponse> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}`, userData).pipe(
      map(updatedUser => {
        const { password, ...userResponse } = updatedUser;
        return userResponse as UserResponse;
      }),
      tap(userResponse => this.saveToStorage(userResponse))
    );
  }

  saveToStorage(user: UserResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  clearStorage(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getUserFromStorage(): UserResponse | null {
    console.log('getUserFromStorage - isBrowser:', this.isBrowser);

    if (!this.isBrowser) {
      console.log('getUserFromStorage - Not browser, returning null');
      return null;
    }

    const userStr = localStorage.getItem('user');
    console.log('getUserFromStorage - userStr from localStorage:', userStr);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('getUserFromStorage - Parsed user:', user);
        return user;
      } catch (error) {
        console.log('getUserFromStorage - Parse error:', error);
        return null;
      }
    }
    console.log('getUserFromStorage - No user in localStorage');
    return null;
  }
}


