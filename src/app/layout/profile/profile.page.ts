import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  name = 'Test display image';
  thumbnail: any;
  picture: Picture;

  constructor(private auth: AuthService, private pictureService: PictureService) {
    // this.user = {_id: "1", username: "John Doe", email: "a@a.ch", password: "1234", registrationDate: "12.01.2021"};
  }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

    this.pictureService.getPicture().subscribe((picture) => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      alert(err.message);
    });


  }

}
