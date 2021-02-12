import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../../models/user";
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/services/picture.service';
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

  constructor(private auth: AuthService, private pictureService: PictureService, private route: ActivatedRoute, public tabPictures: TabElementsService, private router: Router) {
    // this.user = {_id: "1", username: "John Doe", email: "a@a.ch", password: "1234", registrationDate: "12.01.2021"};
    this.pictureId = this.route.snapshot.paramMap.get('id');
    // this.pictures = [
    //   {
    //     id: '1',
    //     description: 'Tokyo en été',
    //     location: { type: "Point", coordinates: [100.878393, 12.930719] },
    //     picture: 'https://www.nacel.fr/medias/_cache/produits/585/imagePrincipale/1920_1440/sejour-linguistique-encadre-japon-tokyo.jpg',
    //     creation_date: "2020-11-10T13:12:46.832Z",
    //     last_mod_date: "2019.01.16",
    //     userId: 1,
    //   },
    //   // },
    //   {
    //     id: '2',
    //     description: 'Seoul en été',
    //     location: { type: "Point", coordinates: [100.878393, 12.930719] },
    //     picture: 'https://pvtistes.net/wp-content/uploads/2018/02/centre-ville-seoul-coree-du-sud.jpg',
    //     creation_date: "2020-11-10T13:12:46.832Z",
    //     last_mod_date: "2021-12-04",
    //     userId: 1,
    //   }
    // ];


  }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

    // this.pictureService.getAllPictures().subscribe((picture) => {
    //   this.pictures = picture;
    // }, err => {
    //   console.warn(err);
    //   alert(err.message);
    // });

  }

}
