import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {
  pictureData: string;

  constructor(private camera: Camera) {

  };

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(pictureData => {
      this.pictureData = pictureData;
    }).catch(err => {
      console.warn(`Could not take picture because: ${err.message}`);
    });
  }

  ngOnInit() {
  }

}
