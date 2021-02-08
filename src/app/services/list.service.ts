import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { retry, catchError } from 'rxjs/operators';
import { List } from '../models/list';
import { ListRequest } from '../models/list-request';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const API_URL = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/pictures/5fa15bd61401d800172fb05f`;
const API_URL_CREATION = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/pictures/`;

const API_URL_FINALE = `${environment.apiUrl}/users/`;

@Injectable({
    providedIn: 'root'
})
export class ListService {
    currentListURL: string;
  idUser: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    // console.log('Hello ListService Provider');
    // console.log('@@@ http client', !!this.http);
    this.auth.getUser().subscribe((user) => {
      this.idUser = user._id;
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

  // Get a list from the database
  getList(): Observable<List> {
    return this.http.get<List>(API_URL);
  }

  // Save a list in the database
  createList(name): Observable<ListRequest> {
    // return console.log("Test: Create a list");

    const requestBody = {
      name: name,
    };
    return this.http.post<ListRequest>(API_URL_CREATION, requestBody);
  }


  // Get all lists from the database
  getAllLists(): Observable<List> {
    // return this.http.get<List>(API_URL_CREATION);
    return this.http.get<List>(API_URL_FINALE+`${this.idUser}/lists`);
  }

  // TO DO
  patchList(description, idList): Observable<List> {
    const requestBody = {
      name: name
    }
    return this.http.patch<List>(API_URL_CREATION+idList, requestBody);
  }

  // TO DO
  deleteList(idList) : Observable<List> {
    return this.http.delete<List>(API_URL_CREATION+idList);
  }

    // // Update item by id
    // updateList(id, item): Observable<List> {
    //     return this.http
    //         .patch<List>(this.base_path + '/' + id, item, this.httpOptions)
    //         .pipe(retry(2), catchError(this.handleError));
    // }

    // // Delete list by id
    // deleteList(id) {
    //     return this.http
    //         .delete<void>(this.base_path + '/' + id, this.httpOptions)
    //         .pipe(retry(2), catchError(this.handleError));
    // }

    // // API path
    // base_path = '/api/lists';
    // httpOptions: object;
    // constructor(private http: HttpClient, private authService: AuthService) {
    //     this.authService.getToken().subscribe(token => {
    //         // Http Options
    //         this.httpOptions = {
    //             headers: new HttpHeaders({
    //                 // ajouter le token
    //                 'Authorization': 'Bearer ' + token
    //             })
    //         };
    //     });
    // }
    // Handle API errors
    // handleError(error: HttpErrorResponse) {
    //     if (error.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         console.error('An error occurred:', error.error.message);
    //     }
    //     else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         console.error(`Backend returned code ${error.status}, ` +
    //             `body was: ${error.error}`);
    //     }
    //     // return an observable with a user-facing error message
    //     return throwError('Something bad happened; please try again later.');
    // }
    // ;

    // // Create a new list
    // createList(list): Observable<List> {
    //     return this.http
    //         .post<List>(this.base_path, list, this.httpOptions)
    //         .pipe(retry(2), catchError(this.handleError));
    // }
    // // Get All lists
    // getAllLists(): Observable<List[]> {
    //     return this.http.get<List[]>(`api/lists`);
    // }


    // getOneList(id): Observable<List> {
    //     return this.http
    //         .get<List>(this.base_path + '/' + id)
    //         .pipe(retry(2), catchError(this.handleError));
    // }

    // // Update item by id
    // updateList(id, item): Observable<List> {
    //     return this.http
    //         .patch<List>(this.base_path + '/' + id, item, this.httpOptions)
    //         .pipe(retry(2), catchError(this.handleError));
    // }

    // // Delete list by id
    // deleteList(id) {
    //     return this.http
    //         .delete<void>(this.base_path + '/' + id, this.httpOptions)
    //         .pipe(retry(2), catchError(this.handleError));
    // }

}
