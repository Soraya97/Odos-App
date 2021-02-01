import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/lists`;
// const API_URL_CREATION = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/lists`;

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getList(): Observable<List> {
    return this.http.get<List>(API_URL);
  }

//   createList(): Observable<ListRequest> {
//     // return console.log("Test: Create a list");

//       const requestBody = {
//         description: "Test Soraya",
//         location: {type: "Point", coordinates: [6.631348200000001, 46.562677400000005]},
//         picture: "https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
//       };
//       return this.http.post<ListRequest>(API_URL_CREATION, requestBody);
//     }

}
