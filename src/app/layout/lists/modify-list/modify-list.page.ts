import { Component, OnInit } from '@angular/core';
import { ListService } from "../../../services/list.service";
import { NgForm } from '@angular/forms';
import { User } from "../../../models/user";
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

@Component({
  selector: 'app-modify-list',
  templateUrl: './modify-list.page.html',
  styleUrls: ['./modify-list.page.scss'],
})
export class ModifyListPage implements OnInit {
  name: string;
  user: User;
  list: List;
  idList: string;
  pictures: Picture[] = [];


  constructor(private pictureService: PictureService, private listService: ListService, public alertController: AlertController, public toastController: ToastController, private route: ActivatedRoute, private auth: AuthService) {
    this.idList = this.route.snapshot.paramMap.get('id');
  }
 //Display form update message
  async newListToast() {
    const toast = await this.toastController.create({
      message: 'Le nom de la liste a bien été modifié',
      duration: 2000
    });
    toast.present();
  }

  // Save the new name list in the db
  validateList(form: NgForm) {
    if (form.valid) {
      let name = this.name;
      let idList = this.idList;
      this.listService.updateList(name, undefined, idList).subscribe(() => {
        this.toast('Le nom de la liste a bien été modifiée');
        this.list.name = this.name;
      },
        (err) => {
          console.warn(err);
          this.alert("Problème", "Ajout impossible", 'La liste n\'a pas pu être ajoutée parce que: ' + err.error.message);
        });
    }
  }

  // Delete a Pic from a List
  deletePicList() {
    let idPic = this.list.picture;
    this.listService.deletePicList(this.idList, idPic).subscribe(() => {
      this.toast('La photo a bien été supprimée de la liste');
    }, (err) => {
      console.warn(err);
      this.alert("Problème", "Suppression impossible", 'La liste n\'a pas pu être supprimée parce que: ' + err.error.message);
    })
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
    //Display & get List
    this.listService.getList(this.idList).subscribe((list) => {
      this.list = list;

      if (this.list.picture.length > 0) {
        for (let i = 0; i < this.list.picture.length; i++) {

          this.pictureService.getPicture(this.list.picture[i]).subscribe((picture) => {
            this.pictures.push(picture);
          }, err => {
            console.warn(err);
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
