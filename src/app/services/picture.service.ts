import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { QimgImage } from '../models/qimg-image';
import { Picture } from '../models/pictures';
import { PictureRequest } from '../models/pictures-request';
import { AuthService } from '../auth/auth.service';

const API_URL = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/pictures/5fa15bd61401d800172fb05f`;
const API_URL_CREATION = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/pictures/`;

const API_URL_FINALE = `${environment.apiUrl}/users/`;

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

  // // Get a picture from the database
  // getPicture(): Observable<Picture> {
  //   return this.http.get<Picture>(API_URL);
  // }

    // Get a picture from the database
    getPicture(idPicture): Observable<Picture> {
      return this.http.get<Picture>(API_URL_FINALE+`${this.idUser}/pictures/${idPicture}`);
    }

  // Save a picture in the database
  createPicture(description, x, y): Observable<PictureRequest> {
    // return console.log("Test: Create a picture");

    const requestBody = {
      description: description,
      location: { type: "Point", coordinates: [x, y] },
      picture: this.currentPictureURL || "https://source.unsplash.com/random"
    };
    return this.http.post<PictureRequest>(API_URL_CREATION, requestBody);
  }


  // Get all pictures from the database
  getAllPictures(): Observable<Picture> {
    // return this.http.get<Picture>(API_URL_CREATION);
    return this.http.get<Picture>(API_URL_FINALE+`${this.idUser}/pictures`);
  }

  // TO DO
  updatePicture(description, idPicture) {
    const requestBody = {
      description: description
    }
    return this.http.patch<Picture>(API_URL_CREATION+idPicture, requestBody);
  }

  // TO DO
  deletePicture(idPicture) : Observable<Picture> {
    return this.http.delete<Picture>(API_URL_FINALE+`${this.idUser}/pictures/`+idPicture);
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
