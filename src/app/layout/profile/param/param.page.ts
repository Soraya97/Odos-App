import { Component, OnInit } from '@angular/core';

import { User } from "../../../models/user";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.scss'],
})
export class ParamPage implements OnInit {
  user: User;
  // pictureData: string;
  username: string;

  constructor(private auth: AuthService) {
  }

//test formulaire à suprimmer
hello(username: string): string {
  return `Bonjour ${username} !`;
}

//   constructor(private camera: Camera, private geolocation: Geolocation, private pictureService: PictureService) { } //private camera: Camera,


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

      /**
   * Process the form we have. Send to whatever backend
   * Only alerting for now
   */
    // paramForm() {
    //   const allInfo = `My name is {{user?.username}}. My email is {{user?.email}}`;
    //   alert(allInfo); 
    // }
  }

}
