import { Injectable } from '@angular/core';
<<<<<<< HEAD
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

=======
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { retry, catchError } from 'rxjs/operators';
import { List } from '../models/list';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    // API path
    base_path = '/api/lists';
    httpOptions: object;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.getToken().subscribe(token => {
            // Http Options
            this.httpOptions = {
                headers: new HttpHeaders({
                    // ajouter le token
                    'Authorization': 'Bearer ' + token
                })
            };
        });
    }
    // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
    ;
    // Create a new list
    createList(list): Observable<List> {
        return this.http
            .post<List>(this.base_path, list, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }
    // Get lists
    getLists(): Observable<List[]> {
        return this.http.get<List[]>(`api/lists`);
    }
    getOneList(id): Observable<List> {
        return this.http
            .get<List>(this.base_path + '/' + id)
            .pipe(retry(2), catchError(this.handleError));
    }

    // Update item by id
    updateList(id, item): Observable<List> {
        return this.http
            .patch<List>(this.base_path + '/' + id, item, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }
    // Delete list by id
    deleteList(id) {
        return this.http
            .delete<void>(this.base_path + '/' + id, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }
>>>>>>> e6cbbc125a7054f56ec0ce901d7abaf0b9c92e6e
}
