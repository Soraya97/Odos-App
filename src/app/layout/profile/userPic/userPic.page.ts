import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

import {ActionSheetController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-userPic',
  templateUrl: './userPic.page.html',
  styleUrls: ['./userPic.page.scss'],
})
export class userPicPage implements OnInit {
  user: User;
  picture: Picture;

  constructor(private auth: AuthService, private pictureService: PictureService, public actionsheetCtrl: ActionSheetController) {}

    async openMenuPic(){
      const actionSheet = await this.actionsheetCtrl.create({
        header: 'Picture options',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              let idPicture = "TO DO";
              this.pictureService.deletePicture(idPicture).subscribe(
              err => {
                console.warn(err);
                // alert(err.message);
              });
            }
          },{
            text: 'Modify',
            role: 'modify',
            handler: () => {
              console.log('Modify clicked');
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await actionSheet.present();
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
