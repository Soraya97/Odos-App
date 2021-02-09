import { Component, OnInit } from '@angular/core';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from "@angular/common/http";

import {ActionSheetController, AlertController, ToastController, ModalController  } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  editable: boolean;
  notEditable: boolean;
  idList: string;
  idPicture: string;
  name: string;



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
    public actionsheetCtrl: ActionSheetController,
    public alertController: AlertController,
    private router: Router,
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    let urlcourante = document.location.href;
    urlcourante = urlcourante.replace(/\/$/, "");
    this.idList = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
    this.notEditable = true;
  }


  async openMenuList() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'List options',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            console.log("Deleted");
            this.deleteListAlert();
          }
        }, {
          // TODO: warn if name already taken
          text: 'Modifier',
          role: 'modify',
          handler: () => {
            this.editList();
          }
        }, {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

   // Active the update mode
   editList() {
    this.editable = true;
    this.notEditable = false;
  }

  // Disable the update mode
  notEditList() {
    this.editable = false;
    this.notEditable = true;
  }

    // Save the new name list in the db
    saveListUpdated(form: NgForm) {
      if (form.valid) {
        this.editable = false;
        this.notEditable = true;
        console.log(this.name);

        let name = this.name;
        let idList = this.idList;
        this.listService.updateList(name, idList).subscribe();
      }
    }

    // Alert activated when Delete selected on the menu of options
  async deleteListAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Supprimer cette liste',
      subHeader: 'Êtes-vous sûr·e de vouloir supprimer cette liste ?',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            console.log('Confirm Okay');
            this.listService.deleteList(this.idList).subscribe(
              err => {
                console.warn(err);
                // alert(err.message);
              });
            this.deletedListToast();
            this.router.navigateByUrl("profile");
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirmation that the liste is deleted
  async deletedListToast() {
    const toast = await this.toastController.create({
      message: 'La liste a bien été supprimée',
      duration: 2000
    });
    toast.present();
  }

  // Confirmation that the liste is updated
  async updatedListToast() {
    const toast = await this.toastController.create({
      message: 'La liste a bien été modifiée',
      duration: 2000
    });
    toast.present();
  }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

    this.listService.getList(this.idList).subscribe((list) => {
      this.list = list;
      console.log(this.list);
    }, err => {
      console.warn(err);
      alert(err.message);
    });


    // this.pictureService.getPicture(this.idPicture).subscribe((picture) => {
    //   this.pictures = picture;
    //   console.log(this.pictures);
    // }, err => {
    //   console.warn(err);
    //   alert(err.message);
    // });

  }

}
