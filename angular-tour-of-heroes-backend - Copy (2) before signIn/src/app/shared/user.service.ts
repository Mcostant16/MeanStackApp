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
    password: ''
  };

  constructor(public http: HttpClient) { }

  postUser(user : User) {
    return  this.http.post( environment.apiBaseUrl+'/register', user);
  }
}
