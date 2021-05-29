import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { User, UserResponse } from '../models/user.interface';
import {catchError, map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}sigin`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('Res =>', res);
          // saveToken()
        }),
        catchError((err)=>this.handlerError(err))
      );
  }

  logout(): void {}
  private readToken(): void {}
  private saveToken(): void {}
  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
   if(err){
     errorMessage = `Error: code ${err.message}`;  
   }
    window.alert(errorMessage)
    return throwError(errorMessage);
    


  }
}
