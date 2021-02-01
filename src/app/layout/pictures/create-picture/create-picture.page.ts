import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { PictureService } from "../../../services/picture.service";

@Component({
  selector: 'app-create-picture',
  templateUrl: './create-picture.page.html',
  styleUrls: ['./create-picture.page.scss'],
})
export class CreatePicturePage implements OnInit {
  picture: string;

  constructor(private camera: Camera, private geolocation: Geolocation, private pictureService: PictureService) {
  }

  validatePicture() {
    // console.log("Photo à enregistrer");
    this.pictureService.createPicture().subscribe(
    //   picture => {
    //   this.picture = picture;
    // },
    err => {
      console.warn('Could not take picture', err);
    });
  }

  ngOnInit() {
    console.log("URL:" + this.pictureService.currentPictureURL);
    this.picture = this.pictureService.currentPictureURL;

  }

}
