import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Picture } from '../models/pictures';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.apiUrl}/feed/`;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  // Get all pictures from the database
  getAllPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(API_URL);
  }

}
