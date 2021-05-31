import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, UserResponse } from '../models/user.interface';
import {catchError, map} from 'rxjs/operators'
import {JwtHelperService } from '@auth0/angular-jwt'

const helper = new JwtHelperService ;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private LoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checktoken();
  }

  get isLogged(): Observable<boolean>{
    return this.LoggedIn.asObservable();

  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/signin`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('Res =>', res);
          this.saveToken(res.token);
          this.LoggedIn.next(true);
          return res;
        }),
        catchError((err)=>this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.LoggedIn.next(false);
  }

  private checktoken(): void {
    const userToken = localStorage.getItem('token')
    const isExpired = helper.isTokenExpired();
    //console.log('isExpired =>', isExpired)
    // set userisLogged = isExpired
  }
  private saveToken(token:string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
   if(err){
     errorMessage = `Error: code ${err.message}`;  
   }
    window.alert(errorMessage)
    return throwError(errorMessage);
  }

  register(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/signup`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('Res =>', res);
          this.saveToken(res.token);
          this.LoggedIn.next(true);
          return res;
        }),
        catchError((err)=>this.handlerError(err))
      );
  }
}
