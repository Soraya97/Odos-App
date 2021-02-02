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

  }


  ngOnInit() {
  }

}
