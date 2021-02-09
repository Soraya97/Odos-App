import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

const API_URL = `${environment.apiUrl}/users`;
const API_URL_FINALE = `${environment.apiUrl}/users/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  idUser: string;

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.auth.getUser().subscribe((user) => {
      this.idUser = user._id;
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(API_URL);
  }

  // TO DO
  deleteUser() : Observable<User> {
    return this.http.delete<User>(API_URL_FINALE + `${this.idUser}`);
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
