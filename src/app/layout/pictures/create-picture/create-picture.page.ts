import { Component, OnInit } from '@angular/core';

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-create-picture',
  templateUrl: './create-picture.page.html',
  styleUrls: ['./create-picture.page.scss'],
})
export class CreatePicturePage implements OnInit {
  // pictureData: string;

  constructor(private geolocation: Geolocation) { } //private camera: Camera, 

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
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
