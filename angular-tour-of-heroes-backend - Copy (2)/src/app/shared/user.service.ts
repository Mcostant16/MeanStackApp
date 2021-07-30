import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    role: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(public http: HttpClient) { }

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

  
  isLoggedIn() {
    var userPayLoad = this.getUserPayLoad();
    if (userPayLoad)
      return userPayLoad.exp > Date.now() / 1000;
    else 
      return false;
  }
}
