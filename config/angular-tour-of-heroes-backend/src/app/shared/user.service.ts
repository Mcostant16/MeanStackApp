import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { environment} from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id: '',
    fullName: '',
    email: '',
    password: '',
    role: ''
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(public http: HttpClient) { }

   /*
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  }; 
}

  //http methods
  postUser(user : User) {
    return  this.http.post( environment.apiBaseUrl+'/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile')
  }

  getUsers() {
    return this.http.get(environment.apiBaseUrl + '/users')
  }
  
  //helper methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayLoad() {
    var token = this.getToken();
    if (token) {
      var userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    else 
      return null;
  }
  
  updateUser(user: User): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/updateUser', user, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${user._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  


  isLoggedIn() {
    var userPayLoad = this.getUserPayLoad();
    if (userPayLoad)
      return userPayLoad.exp > Date.now() / 1000;
    else 
      return false;
  }
}
