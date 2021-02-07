import { Component, OnInit } from '@angular/core';

import { User } from "../../../models/user";
import { AuthService } from 'src/app/auth/auth.service';

import { AlertController } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';

import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.scss'],
})
export class ParamPage implements OnInit {
  user: User;
  // username: string;

  constructor(private auth: AuthService, private userService: UserService, public alertController: AlertController, public popoverController: PopoverController) {
  }

//test formulaire à suprimmer
hello(username: string): string {
  return `Bonjour ${username} !`;
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
        handler: (oui) => {
          console.log('Confirm Yes: oui');
          // this.userService.deleteUser().subscribe(
          // err => {
          //   console.warn(err);
          //   // alert(err.message);
          // });
        }
      }
    ]
  });

  await alert.present();
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




// ESSAI FORMULAIRE
// paramForm(value){
//   this.userService.updateUser(value)
//   .then( res => {
//     let toast = this.toastCtrl.patch({
//       message: 'User was modified successfully',
//       duration: 3000
//     });
//     toast.present();
//     this.resetFields();
//   }, err => {
//     console.log(err)
//   })
// }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

      /**
   * Process the form we have. Send to whatever backend
   * Only alerting for now
   */
    // paramForm() {
    //   const allInfo = `My name is {{user?.username}}. My email is {{user?.email}}`;
    //   alert(allInfo); 
    // }
  }

}
