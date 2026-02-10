import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {map, Observable, tap} from 'rxjs';
import {LoginRequest} from '../dto/LoginRequest';
import {UserResponse} from '../dto/UserResponse';


@Injectable({
  providedIn:'root'
})
export class AuthService{
 private apiUrl ='http://localhost:3000/users'

  constructor(private http:HttpClient) {}

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http.get<User[]>(this.apiUrl).pipe(
     map(users => {
       console.log("ussssers" , users);
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



  saveToStorage(user: UserResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUserFromStorage(): UserResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}
