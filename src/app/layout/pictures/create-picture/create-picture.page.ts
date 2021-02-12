import { Component, OnInit } from '@angular/core';


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

  constructor(private pictureService: PictureService, private geolocationService: GeolocationService, private router: Router, public alertController: AlertController, public toastController: ToastController) {
  }

  validatePicture(form: NgForm) {
    if (form.valid) {
      // console.log("Photo à enregistrer");
      let description = this.descr;
      let x = this.lat;
      let y = this.long;

      this.pictureService.createPicture(description, x, y).subscribe(() => {
        this.toast('La photo a bien été ajoutée');
        this.router.navigateByUrl("/profile");
        

        // TO-DO: Must see the new picture in the gallery
      }, (err) => {
        console.warn(err);
          this.toast('La photo n\'a pas pu être ajoutée parce que: ' + err.error.message);
      });

    }

  }

  async toast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // function that show what the user is typing
  search(citySearched: string) {
    return `${citySearched}`;
  }

  ngOnInit() {
    console.log("URL:" + this.pictureService.currentPictureURL);
    this.picture = this.pictureService.currentPictureURL;
    console.log(this.picture);


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
    })
      .catch(function(err) {
        alert("Votre géolocalisation est désactivée, votre photo sera géolocalisée au Pôle sud par défaut");
      });
  }

}
