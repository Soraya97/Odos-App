import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/users`;
const API_URL_UPDATE = `${environment.apiUrl}/users/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(API_URL);
  }

  // ESSAI FORMULAIRE
  // updateUser(username, email, password, idUser) {
  //   const requestBody = {
  //     username: username,
  //     email: email,
  //     password: password
  //   }
  //   return this.http.patch<User>(API_URL_UPDATE+idUser, requestBody);
  // }
}
