import { Component, OnInit } from '@angular/core';

import { User } from "../../../models/user";
import { AuthService } from 'src/app/auth/auth.service';

import { ActionSheetController, AlertController, ToastController} from '@ionic/angular';

import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';

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
  idUser: string;
  editable: boolean;
  notEditable: boolean;

  constructor(private auth: AuthService, private userService: UserService, public actionsheetCtrl: ActionSheetController, public alertController: AlertController, public toastController: ToastController, private router: Router, public popoverController: PopoverController) {
    this.notEditable = true;
  }

  //test formulaire à suprimmer
  hello(username: string): string {
    return `Bonjour ${username} !`;
  }

  paramForm() {
    console.log(this.username);
    console.log(this.email);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: 'Êtes-vous sûr(e) de <strong>supprimer votre compte</strong>?',
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
            this.userService.deleteUser().subscribe(
              err => {
                console.warn(err);
                // alert(err.message);
              });
              this.deletedUserToast();
            this.router.navigateByUrl("login");
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirmation that the user is deleted
  async deletedUserToast() {
    const toast = await this.toastController.create({
      message: 'Votre compte a été supprimé',
      duration: 2000
    });
    toast.present();
  }

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

  // Save the update of the user in the db
  saveUserUpdated(form: NgForm) {
    if (form.valid) {
      this.editable = false;
      this.notEditable = true;
      console.log(this.username, this.email);

      let username = this.username;
      let email = this.email;
      let password = this.password;
      this.userService.updateUser(username, email, password).subscribe();
    }

      // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  // Open the menu of options: Delete or Update
  }
  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

}
