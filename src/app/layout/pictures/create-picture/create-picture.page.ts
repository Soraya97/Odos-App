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
  } //private camera: Camera,

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
    // this.camera.getPicture().then(pictureData => {
    //   this.pictureData = pictureData;
    // }).catch(err => {
    //   console.warn(`Could not take picture because: ${err.message}`);
    // });


  }

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then(pictureData => {
  //     this.pictureData = pictureData;
  //   }).catch(err => {
  //     console.warn(`Could not take picture because: ${err.message}`);
  //   });
  // }

}
