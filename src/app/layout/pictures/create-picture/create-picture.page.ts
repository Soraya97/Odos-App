import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { PictureService } from "../../../services/picture.service";
import { GeolocationService } from 'src/app/services/geolocation.service';
import { City } from 'src/app/models/city';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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

  constructor(private camera: Camera, private geolocation: Geolocation, private pictureService: PictureService, private geolocationService: GeolocationService, private router: Router, public alertController: AlertController, public toastController: ToastController) {
  }

  validatePicture(form: NgForm) {
    if (form.valid) {
      // console.log("Photo à enregistrer");
      let description = this.descr;
      let x = this.lat;
      let y = this.long;
      if (x === undefined && y === undefined) {
        x = 90.000000;
        y = -135.000000;
      }

      this.pictureService.createPicture(description, x, y).subscribe(err => {
        console.warn(err);
        // alert(err.message);
      });
      // TODO: if no errors
      this.newPictureToast();
      this.router.navigateByUrl("/profile");
    }

  }

  async newPictureToast() {
    const toast = await this.toastController.create({
      message: 'La photo a bien été ajoutée',
      duration: 2000
    });
    toast.present();
  }

  // function that show what the user is typing
  search(citySearched: string) {
    return `${citySearched}`;
  }

  async descrAlreadyTaken() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      subHeader: `Nom ${this.descr} déjà utilisé`,
      message: "Merci d'en choisir un autre",
      buttons: ['OK']
    });

    await alert.present();
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
