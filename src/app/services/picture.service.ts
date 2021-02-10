import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { QimgImage } from '../models/qimg-image';
import { Picture } from '../models/pictures';
import { PictureRequest } from '../models/pictures-request';
import { AuthService } from '../auth/auth.service';
import { throwError } from 'rxjs';

const API_URL = `${environment.apiUrl}/users/`;

@Injectable({
  providedIn: 'root'
})

export class PictureService {
  currentPictureURL: string;
  idUser: string;


  constructor(private camera: Camera, private http: HttpClient, private auth: AuthService) {
    // console.log('Hello PictureService Provider');
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



  // Get a picture from the database
  getPicture(idPicture): Observable<Picture> {
    return this.http.get<Picture>(API_URL + `${this.idUser}/pictures/${idPicture}`);
  }

  // Save a picture in the database
  createPicture(description, x, y): Observable<PictureRequest> {
    // return console.log("Test: Create a picture");

    const requestBody = {
      description: description,
      location: { type: "Point", coordinates: [x || -135.000000, y || 90.000000] },
      picture: this.currentPictureURL || "https://source.unsplash.com/random"
    };
    return this.http.post<PictureRequest>(API_URL + `${this.idUser}/pictures/`, requestBody);
      // .pipe(retry(2), catchError(this.handleError));
  }


  // Get all pictures from the database
  getAllPictures(): Observable<Picture> {
    return this.http.get<Picture>(API_URL + `${this.idUser}/pictures`);
  }

  // Update the description of a photo
  updatePicture(description, idPicture): Observable<Picture> {
    const requestBody = {
      description: description
    }
    return this.http.patch<Picture>(API_URL + `${this.idUser}/pictures/` + idPicture, requestBody);
      // .pipe(retry(2), catchError(this.handleError));
  }

  // TO DO
  deletePicture(idPicture): Observable<Picture> {
    return this.http.delete<Picture>(API_URL + `${this.idUser}/pictures/` + idPicture);
  }

  /**
   * Launches the camera to take a picture.
   *
   * Returns an observable that will emit the raw picture data as a string
   * once the picture has been taken. An error may be emitted instead if the
   * user does not take a picture.
   */
  private takePicture(): Observable<string> {

    // Prepare camera options.
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // Start taking a picture.
    // The promise will be resolved when the user has snapped and validated the picture.
    // It may be rejected if the user does not take a picture.
    const pictureDataPromise = this.camera.getPicture(options);

    // Convert the promise to an observable and return it.
    return from(pictureDataPromise);
  }

  /**
   * Uploads raw picture data to the qimg API.
   *
   * Returns an observable that will emit the created QimgImage object.
   * An error may be emitted instead if the upload fails.
   */
  private uploadPicture(pictureData: string): Observable<QimgImage> {

    const requestBody = {
      data: pictureData
    };

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${environment.qimgSecret}`
      }
    };

    return this.http.post<QimgImage>(`${environment.qimgUrl}/images`, requestBody, requestOptions);
  }

  /**
     * Takes a picture, uploads it to the qimg API, and returns the created image.
     *
     * Returns an observable that will emit the created QimgObject if the picture
     * has been taken and successfully uploaded to the qimg API. An error may be
     * emitted instead if the user does not take a picture of if the upload fails.
     */
  takeAndUploadPicture(): Observable<QimgImage> {

    // Take a picture.
    // This creates an observable of picture data.
    const pictureData$ = this.takePicture();

    // Once the picture has been taken, upload it to the qimg API.
    // This returns a new observable of the resulting QimgImage object.
    const uploadedImage$ = pictureData$.pipe(switchMap(data => this.uploadPicture(data)));
    // Once the picture has been uploaded, log a message to the console indicating that all went well.
    // This does not change the observable stream.
    const debug$ = uploadedImage$.pipe(tap(image => {
      console.log(`Successfully uploaded picture to ${image.url}`);
      this.currentPictureURL = image.url;
    }
    ));

    // Return the observable stream.
    return debug$;
  }


}
// }
