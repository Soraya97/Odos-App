import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from "../../models/user";
import { AuthService } from 'src/app/auth/auth.service';
import { Picture } from 'src/app/models/pictures';
import { TabElementsService } from 'src/app/services/tab-elements.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  picture: Picture;
  pictures: Picture[];
  pictureId: string;

  constructor(private auth: AuthService, private route: ActivatedRoute, public tabPictures: TabElementsService) {
    this.pictureId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
  //get & display users
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });


  }

}
