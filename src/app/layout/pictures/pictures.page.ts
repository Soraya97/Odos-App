import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController, AlertController } from '@ionic/angular';

import { QimgImage } from '../../models/qimg-image';
import { PictureService } from "../../services/picture.service";


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {
  picture: QimgImage;

  constructor(readonly pictureService: PictureService, private router: Router, public toastController: ToastController, public alertController: AlertController) {

  };

  // Take a picture
  takePicture() {
    // this.pictureService.currentPictureURL = "http://example.com";
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.router.navigateByUrl("/pictures/create-picture");
    }, err => {
      console.warn('Could not take picture', err);
      this.alert("Impossible", "Impossible de prendre de photo", "Une photo random sera alors utilisée");
    });
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
            this.router.navigateByUrl("/pictures/create-picture");
          }
        }]

    });

    await alert.present();
  }

  ngOnInit() {
  }

}
