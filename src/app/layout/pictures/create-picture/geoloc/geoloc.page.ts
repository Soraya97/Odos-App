import { Component, OnInit } from '@angular/core';

import { Geoposition } from '@ionic-native/geolocation/ngx';

import { City } from 'src/app/models/city';
import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {
  longitude: Geoposition;
  latitude: Geoposition;
  city: City;
  citySearched: string;

  constructor(private geolocationService: GeolocationService) {
  }

  // function that show what the user is typing
  search(citySearched: string) {
    return `${citySearched}`;
  }


  ngOnInit() {
    this.geolocationService.getGeolocation().then((coords: Coordinates) => {
      this.geolocationService.getCity(coords.latitude, coords.longitude).subscribe(city => {
        this.city = city
        // console.log(city);

      }), err => {
        console.warn(err);
        alert(err.message);
      }
    });

  }

}
