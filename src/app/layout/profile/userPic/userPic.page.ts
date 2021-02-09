import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userPic',
  templateUrl: './userPic.page.html',
  styleUrls: ['./userPic.page.scss'],
})
export class userPicPage implements OnInit {
  user: User;
  picture: Picture;
  idPicture: string;
  editable: boolean;
  descr: string;
  notEditable: boolean;

  constructor(private auth: AuthService, private pictureService: PictureService, public actionsheetCtrl: ActionSheetController, public alertController: AlertController, private router: Router, public toastController: ToastController, public modalController: ModalController) {
    let urlcourante = document.location.href;
    urlcourante = urlcourante.replace(/\/$/, "");
    this.idPicture = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
    this.notEditable = true;
  }

  // TO DO
  addToList() {
    console.log("Add to list");
    this.router.navigateByUrl("/profile/add-pic-list");
  }

  // Open the menu of options: Delete or Update
  async openMenuPic() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Options de la photo',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            console.log("Deleted");
            this.deletePhotoAlert();
          }
        }, {
          // TODO: warn if name already taken
          text: 'Modifier',
          role: 'modify',
          handler: () => {
            this.editPicture();
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
  editPicture() {
    this.editable = true;
    this.notEditable = false;
  }

  // Disable the update mode
  notEditPicture() {
    this.editable = false;
    this.notEditable = true;
  }

  // Save the new picture in the db
  savePictureUpdated(form: NgForm) {
    if (form.valid) {
      this.editable = false;
      this.notEditable = true;
      console.log(this.descr);

      let description = this.descr;
      let idPicture = this.idPicture;
      this.pictureService.updatePicture(description, idPicture).subscribe(err => {
        console.warn(err);
        // alert(err.message);
      });
    }
  }

  // Alert activated when Delete selected on the menu of options
  async deletePhotoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Supprimer cette photo',
      subHeader: 'Êtes-vous sûr·e de vouloir supprimer cette photo ?',
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
            this.pictureService.deletePicture(this.idPicture).subscribe(
              err => {
                console.warn(err);
                // alert(err.message);
              });
            this.deletedPictureToast();
            this.router.navigateByUrl("profile");
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirmation that the picture is deleted
  async deletedPictureToast() {
    const toast = await this.toastController.create({
      message: 'La photo a bien été supprimée',
      duration: 2000
    });
    toast.present();
  }

  // Confirmation that the picture is updated
  async updatedPictureToast() {
    const toast = await this.toastController.create({
      message: 'La photo a bien été modifiée',
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

    this.pictureService.getPicture(this.idPicture).subscribe((picture) => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

}
