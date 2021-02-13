import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { GeolocationService } from 'src/app/services/geolocation.service';
import { City } from 'src/app/models/city';
import { TabElementsService } from 'src/app/services/tab-elements.service';
import { PictureService } from 'src/app/services/picture.service';

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

  constructor(public tabPictures: TabElementsService, private pictureService: PictureService, private geolocationService: GeolocationService, private router: Router, public alertController: AlertController, public toastController: ToastController) {
  }

  // Validate and save the new picture in the db
  validatePicture(form: NgForm) {
    if (form.valid) {
      // console.log("Photo à enregistrer");
      let description = this.descr;
      let x = this.lat;
      let y = this.long;

      this.pictureService.createPicture(description, x, y).subscribe(() => {
        this.toast('La photo a bien été ajoutée');
        this.tabPictures.changePic();
        this.router.navigateByUrl("/profile");
      }, (err) => {
        console.warn(err);
        this.alert("Problème", "Ajout impossible", 'La photo n\'a pas pu être ajoutée parce que: ' + err.error.message);
      });
    }
  }

  // Trigger a toast
  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // Trigger an alert
  async alert(head: string, sub: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: head,
      subHeader: sub,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }]

    });

    await alert.present();
  }

  ngOnInit() {
    // Call the service for the geolocation and the city
    this.geolocationService.getGeolocation().then((coords: Coordinates) => {
      this.geolocationService.getCity(coords.latitude, coords.longitude).subscribe(city => {
        this.city = city,
          this.lat = coords.latitude,
          this.long = coords.longitude
      }), err => {
        console.warn(err);
        this.alert("Impossible", "Impossible à atteindre", "La ville n'a pas pu être trouvée parce que: " + err.error.message);
      }
    })
      .catch(function(err) {
        alert("Votre photo sera géolocalisée au Pôle sud par défaut");
      });
  }

}
