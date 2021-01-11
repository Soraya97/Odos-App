import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { QimgImage } from '../../models/qimg-image';
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {
  // pictureData: string;
  picture: QimgImage;


  constructor(private camera: Camera, readonly pictureService: PictureService, private router: Router) {

  };

  takePicture() {
  // this.pictureService.currentPictureURL = "http://example.com";
  this.pictureService.takeAndUploadPicture().subscribe(picture => {
    this.picture = picture;
  }, err => {
    console.warn('Could not take picture', err);
  });
  this.router.navigateByUrl("/pictures/create-picture");
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };
    // this.camera.getPicture(options).then(pictureData => {
    //   this.pictureData = pictureData;
    // }).catch(err => {
    //   console.warn(`Could not take picture because: ${err.message}`);
    // });
  }


  ngOnInit() {
  }

}
