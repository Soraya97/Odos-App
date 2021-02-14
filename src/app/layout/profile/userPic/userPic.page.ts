import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { City } from 'src/app/models/city';
import { TabElementsService } from 'src/app/services/tab-elements.service';

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
  productId: string;
  city: City;

  constructor(public tabPictures: TabElementsService, private geolocationService: GeolocationService, private auth: AuthService, private pictureService: PictureService, private route: ActivatedRoute, public actionsheetCtrl: ActionSheetController, public alertController: AlertController, private router: Router, public toastController: ToastController, public modalController: ModalController) {
    this.idPicture = this.route.snapshot.paramMap.get('id');
    this.notEditable = true;
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

      let description = this.descr;
      let idPicture = this.idPicture;
      this.pictureService.updatePicture(description, idPicture).subscribe(() => {
        this.toast('La photo a bien été modifiée');
        this.picture.description = this.descr;
      },
        (err) => {
          console.warn(err);
          this.alert("Problème", "Ajout impossible", 'La photo n\'a pas pu être modifiée parce que: ' + err.error.message);
        });

    }

  }

  // Trigger an alert
  async alert(head: string, sub: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: head,
      subHeader: sub,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }]

    });

    await alert.present();
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
            this.pictureService.deletePicture(this.idPicture).subscribe(() => {
              this.toast('La photo a bien été supprimée');
              this.tabPictures.changePic();
              this.router.navigateByUrl("profile");

              //TODO: Must not see the picture in the gallery
            }, (err) => {
              console.warn(err);
              this.toast("Un problème est survenu");
            });


          }
        }
      ]
    });

    await alert.present();
  }

  // Display a message
  async toast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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

      this.geolocationService.getCity(this.picture.location.coordinates[0], this.picture.location.coordinates[1]).subscribe(city => {
        this.city = city;
        console.log(city);
      }), err => {
        console.warn(err);
        alert(err.message);
      }

    }, err => {
      console.warn(err);
      alert(err.message);
    });



  }

}
