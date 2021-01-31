import { Component, OnInit } from '@angular/core';

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

// import { PictureService } from "../../../services/picture.service";

@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.scss'],
})
export class ParamPage implements OnInit {
  pictureData: string;
  username: string;



//test formulaire à suprimmer
hello(username: string): string {
  return `Bonjour ${username} !`;
}

//   constructor(private camera: Camera, private geolocation: Geolocation, private pictureService: PictureService) { } //private camera: Camera,


  ngOnInit() {


  }

}
