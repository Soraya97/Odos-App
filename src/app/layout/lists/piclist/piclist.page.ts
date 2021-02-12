import { Component, OnInit } from '@angular/core';

import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from "@angular/common/http";

import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TabElementsService } from 'src/app/services/tab-elements.service';

@Component({
  selector: 'app-piclist',
  templateUrl: './piclist.page.html',
  styleUrls: ['./piclist.page.scss'],
})
export class PiclistPage implements OnInit {
  user: User;
  picture: Picture;
  pictures: Picture[] = [];
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
    public modalController: ModalController,
    private route: ActivatedRoute,
    public tabLists: TabElementsService
  ) {
    this.idList = this.route.snapshot.paramMap.get('id');
  }


  async openMenuList() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Options de la liste',
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
            // this.editList();
            this.router.navigate(['lists/modify-list', this.idList]);
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

  //  // Active the update mode
  //  editList() {
  //   this.editable = true;
  //   this.notEditable = false;
  // }

  // // Disable the update mode
  // notEditList() {
  //   this.editable = false;
  //   this.notEditable = true;
  // }

  // // Save the new name list in the db
  // saveListUpdated(form: NgForm) {
  //   if (form.valid) {
  //     this.editable = false;
  //     this.notEditable = true;
  //     console.log(this.name);

  //     let name = this.name;
  //     let idList = this.idList;
  //     this.listService.updateList(name, undefined, idList).subscribe(() => {
  //       this.toast('Le nom de la liste a bien été modifiée');
  //     this.list.name = this.name;
  //   },
  //   (err) => {
  //     this.toast(err.error.message);
  //     });
  //   }
  // }

  // Alert activated when Delete selected on the menu of options
  async deleteListAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention !',
      subHeader: 'Êtes-vous sûr·e de vouloir supprimer cette liste ?',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel : Non');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            console.log('Confirm Yes : Oui');
            this.listService.deleteList(this.idList).subscribe(() => {
              this.tabLists.changeList();
              this.toast("Votre liste a été supprimée");
              this.router.navigateByUrl("lists");
            },
              err => {
                console.warn(err);
                this.toast("La liste n'a pas pu être supprimée");
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

  // // Confirmation that the liste is updated
  // async updatedListToast() {
  //   const toast = await this.toastController.create({
  //     message: 'La liste a bien été modifiée',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      // console.warn(err);
      // alert(err.message);
    });

    this.listService.getList(this.idList).subscribe((list) => {
      this.list = list;
      console.log(this.list._id);

      // console.log(this.list.picture.length);
      if (this.list.picture.length > 0) {
        for (let i = 0; i < this.list.picture.length; i++) {
          // console.log(this.list.picture[i]);

          this.pictureService.getPicture(this.list.picture[i]).subscribe((picture) => {
            this.pictures.push(picture);
          }, err => {
            // console.warn(err);
            // alert(err.message);
          })
        }
      }


    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

}
