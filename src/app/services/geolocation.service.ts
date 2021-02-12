import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Observable } from 'rxjs';
import { City } from '../models/city';

let BigDataCloudAPI = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient, private geolocation: Geolocation) { }

  // Return a promise of coordinates
  async getGeolocation(): Promise<Coordinates> {
    const position = await this.geolocation.getCurrentPosition();
    const coords = position.coords;
    console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    return coords;

  }

// Transforms coordinates into full city informations
  getCity(x: number, y: number): Observable<City> {
    const latitude = "latitude=" + x;
    const longitude = "&longitude=" + y;
    const query = latitude + longitude + "&localityLanguage=fr";
    return this.http.get<City>(BigDataCloudAPI += query);
  }
}
