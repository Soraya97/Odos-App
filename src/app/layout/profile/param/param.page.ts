import { Component, OnInit } from '@angular/core';

import { User } from "../../../models/user";
import { AuthService } from 'src/app/auth/auth.service';

import { ActionSheetController, AlertController, ToastController, PopoverController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.scss'],
})
export class ParamPage implements OnInit {
  user: User;
  username: string;
  email: string;
  password: string;
  // idUser: string;
  editable: boolean;
  notEditable: boolean;

  constructor(private auth: AuthService, private userService: UserService, public actionsheetCtrl: ActionSheetController, public alertController: AlertController, public toastController: ToastController, private router: Router, public popoverController: PopoverController) {
    this.notEditable = true;
  }

  // Open the menu to modify the user's information
  async openMenuPic() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Options du compte',
      buttons: [
        {
          // TODO: warn if name already taken
          text: 'Modifier les informations',
          role: 'modify',
          handler: () => {
            this.editUser();
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
  editUser() {
    this.editable = true;
    this.notEditable = false;
  }

  // Disable the update mode
  notEditUser() {
    this.editable = false;
    this.notEditable = true;
  }

  // Alert to confirm if the user want to proceed to the update
  async updateConfirm(form: NgForm) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      subHeader: "Êtes-vous sûr·e de vouloir modifier votre compte?",
      message: 'Ces modifications vont vous déconnecter',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: non');
            this.notEditUser();
          }
        }, {
          text: 'Modifier',
          handler: () => {
            this.saveUserUpdated(form );
          },
        }
      ]
    });

    await alert.present();
  }

  // Save the update of the user in the db
  saveUserUpdated(form) {
    if (form.valid) {
      this.editable = false;
      this.notEditable = true;
      console.log(this.username, this.email);

      let username = this.username;
      let email = this.email;
      let password = this.password;
      this.userService.updateUser(username, email, password).subscribe(() =>{
        console.log("logging out...");
        this.auth.logOut();
        this.router.navigateByUrl("login");
        this.toast("Veuillez vous reconnecter");
      },
      (err) => {
        console.warn(err);
        this.toast("Les modifications n'ont pas pu être apportées");

      });
    }
  }

  // Alert to confirm if the user want to delete her/his account
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: 'Êtes-vous sûr·e de vouloir supprimer votre compte?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (non) => {
            console.log('Confirm Cancel: non');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            console.log('Confirm Yes: oui');
            this.userService.deleteUser().subscribe(() => {
              this.toast("Votre compte a été supprimé");
              console.log("logging out...");
              this.auth.logOut();
              this.router.navigateByUrl("login");
            }, 
            (err) => {
              console.warn(err);
              this.toast("Le compte n'a pas pu être supprimé");
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

  // Open the menu of options: Delete or Update
  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

}
