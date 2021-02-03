import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { PictureService } from "../../../services/picture.service";
import { GeolocationService } from 'src/app/services/geolocation.service';
import { City } from 'src/app/models/city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-picture',
  templateUrl: './create-picture.page.html',
  styleUrls: ['./create-picture.page.scss'],
})
export class CreatePicturePage implements OnInit {
  picture: string;
  city: City;
  citySearched: string;
  lat: number;
  long: number;
  descr: string;
  displayedDescr: string;

  constructor(private camera: Camera, private geolocation: Geolocation, private pictureService: PictureService, private geolocationService: GeolocationService) {
  }

  validatePicture(form: NgForm) {
    if (form.valid) {
      // console.log("Photo à enregistrer");
      this.displayedDescr = this.descr;
      let description = this.displayedDescr;
      let x = this.long;
      let y = this.lat;
      // this.pictureService.createPicture(description, x, y).subscribe(
      // //   picture => {
      // //   this.picture = picture;
      // // },
      // err => {
      //   console.warn('Could not take picture', err);
      // });
    }
  }

  // function that show what the user is typing
  search(citySearched: string) {
    return `${citySearched}`;
  }

  ngOnInit() {
    console.log("URL:" + this.pictureService.currentPictureURL);
    this.picture = this.pictureService.currentPictureURL;

    this.geolocationService.getGeolocation().then((coords: Coordinates) => {
      this.geolocationService.getCity(coords.latitude, coords.longitude).subscribe(city => {
        this.city = city,
          this.lat = coords.latitude,
          this.long = coords.longitude
        // console.log(city);

      }), err => {
        console.warn(err);
        alert(err.message);
      }
    });
  }

}
