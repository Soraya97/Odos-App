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

<<<<<<< HEAD
  constructor(private auth: AuthService, private pictureService: PictureService, public actionsheetCtrl: ActionSheetController) {
  }
    // async openMenu(){  
    //   const actionSheet = await this.actionsheetCtrl.create({  
    //     header: 'Add to a list',  
    //     buttons: [  
    //       {  
    //         text: 'Destructive',  
    //         role: 'destructive',  
    //         handler: () => {  
    //           console.log('Destructive clicked');  
    //         }  
    //       },{  
    //         text: 'Archive',  
    //         handler: () => {  
    //           console.log('Archive clicked');  
    //         }  
    //       }, {  
    //         text: 'Cancel',  
    //         role: 'cancel',  
    //         handler: () => {  
    //           console.log('Cancel clicked');  
    //         }  
    //       }  
    //     ]  
    //   });  
    //   await actionSheet.present();  
    // }  


=======
  constructor(private auth: AuthService, private pictureService: PictureService, public actionsheetCtrl: ActionSheetController) {}

    async openMenu(){
      const actionSheet = await this.actionsheetCtrl.create({
        header: 'Add to a list',
        buttons: [
          {
            text: 'Destructive',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: 'Archive',
            handler: () => {
              console.log('Archive clicked');
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


>>>>>>> 5a01d826179010a3a0af39891a7ba4b9806a16b2

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
