import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { retry, catchError } from 'rxjs/operators';
import { List } from '../models/list';
import { ListRequest } from '../models/list-request';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const API_URL = `${environment.apiUrl}/users/`;

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


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      alert(error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
      alert(error.message);
      // if (error.status == 422) {
      //   alert("Ce mot est déjà utilisé");
      // }

    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


  // Get a list from the database
  getList(idList): Observable<List> {
    return this.http.get<List>(API_URL + `${this.idUser}/lists/${idList}`);
  }

  // Save a list in the database
  createList(name): Observable<ListRequest> {
    // return console.log("Test: Create a list");

    const requestBody = {
      name: name,
    };
    return this.http.post<ListRequest>(API_URL + `${this.idUser}/lists/`, requestBody)
    //.pipe(retry(2), catchError(this.handleError));
  }


  // Get all lists from the database
  getAllLists(): Observable<List[]> {
    // return this.http.get<List>(API_URL_CREATION);
    return this.http.get<List[]>(API_URL + `${this.idUser}/lists`);
  }

  // Update the name of a list
  updateList(name, picture, idList): Observable<List> {
    // console.log(name, picture, idList);

    const requestBody = {
      name: name,
      picture: picture
    }
    return this.http.patch<List>(API_URL + `${this.idUser}/lists/` + idList, requestBody)
    //.pipe(retry(2), catchError(this.handleError));
  }

  // TO DO
  deleteList(idList): Observable<List> {
    return this.http.delete<List>(API_URL + `${this.idUser}/lists/` + idList);
  }

  deletePicList(idList, idPic): Observable<List> {
    return this.http.delete<List>(API_URL + `${this.idUser}/lists/` + idList + `/picture/` + idPic);
  }


}
