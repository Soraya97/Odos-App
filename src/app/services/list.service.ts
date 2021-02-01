import { Injectable } from '@angular/core';
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
}
