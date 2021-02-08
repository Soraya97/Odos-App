import { Component, OnInit } from '@angular/core';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from "@angular/common/http";

import {ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-piclist',
  templateUrl: './piclist.page.html',
  styleUrls: ['./piclist.page.scss'],
})
export class PiclistPage implements OnInit {
  user: User;
  picture: Picture;
  pictures: Picture;
  list: List;



  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    // Inject the ListService
    private listService: ListService,
    // Inject the PictureService
    private pictureService: PictureService,
    // Inject the ActionSheetController
    public actionsheetCtrl: ActionSheetController
  ) { }


  async openMenuList(){
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'List options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            let idList = "TO DO";
            this.listService.deleteList(idList).subscribe(
            err => {
              console.warn(err);
              // alert(err.message);
            });
          }
        },{
          text: 'Modify',
          role: 'modify',
          handler: () => {
            let idList = "TO DO";
            let description = "TO DO";
            this.listService.patchList(name, idList).subscribe(
            err => {
              console.warn(err);
              // alert(err.message);
            });
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

  getId(id) {
    console.log(id);
    // TROUVER COMMENT REDIRIGER L'UTILISATEUR 
  }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

    this.listService.getList().subscribe((list) => {
      this.list = list;
      console.log(this.list);
    }, err => {
      console.warn(err);
      alert(err.message);
    });


    this.pictureService.getAllPictures().subscribe((picture) => {
      this.pictures = picture;
      console.log(this.pictures);
    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

}
