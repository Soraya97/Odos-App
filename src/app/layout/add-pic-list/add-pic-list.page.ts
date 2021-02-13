import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ToastController, AlertController } from '@ionic/angular';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-add-pic-list',
  templateUrl: './add-pic-list.page.html',
  styleUrls: ['./add-pic-list.page.scss'],
})
export class AddPicListPage implements OnInit {
  lists: List[];
  ids: string[];
  idPicture: string;
  picture: Picture;
  list: List;
  idList: string;

  form = new FormGroup({
    list: new FormControl('', Validators.required)
  });

  constructor(private listService: ListService, private pictureService: PictureService, public toastController: ToastController, private route: ActivatedRoute, public alertController: AlertController) {
    this.idPicture = this.route.snapshot.paramMap.get('id');
  }

  get f() {
    return this.form.controls;
  }

  // Add a pic to a list with its id and list's id
  addPicsList() {
    this.idList = this.form.value;
    console.log(this.form.value);

    Object.prototype.toString = function() {
      let thestring = this.list;
      return thestring;
    };

    // this.listService.updateList(undefined, this.idPicture, this.idList).subscribe(() => {
    //   this.listService.getList(this.idList).subscribe((list) => {
    //     this.list = list;
    //     this.toast(`La photo ${this.picture.description} a bien été ajoutée à la liste ${this.list.name}`);
    //   }, err => {
    //     console.warn(err);
    //     this.toast(err.error.message);
    //   });
    // }, (err) => {
    //   console.warn(err);
    //   this.alert("Impossible", "Ajout impossible", "La photo n'a pas pu être ajoutée à la liste parce que: " + err.error.message);
    // });
  }

  // Trigger a toast
  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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


  ngOnInit() {
    // Call the service for the lists
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
    }, err => {
      console.warn(err);
      this.alert("Impossible", "Impossible à atteindre", "Les listes n'ont pas pu être affichées parce que: " + err.message);
    });

    // Call the service for the pictures
    this.pictureService.getPicture(this.idPicture).subscribe((picture) => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      this.alert("Impossible", "Impossible à atteindre", "La photo n'a pas pu être atteinte parce que: " + err.message);
    });

  }

}
