import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { PictureService } from './picture.service';
import { Picture } from '../models/pictures';
import { ListService } from './list.service';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class TabElementsService {
  pictures: Picture[];
  lists: List[];

  constructor(public pictureService: PictureService, private listService: ListService, public alertController: AlertController) {
    this.changePic();
    this.changeList();
  }

// Show and change pictures
  changePic() {
    this.pictureService.getAllPictures().subscribe((picture) => {
      this.pictures = picture.sort((a: Picture, b: Picture) =>
        new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
      console.log(this.pictures);

    }, (err) => {
      console.warn(err);
      this.alert("Erreur", "Impossible à afficher", "Les photos ne peuvent pas être affichées parce que: " + err.error.message);
    });
  }

// Show and change lists
  changeList() {
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
      console.log(this.lists);
    }, err => {
      console.warn(err);
      this.alert("Erreur", "Impossible à afficher", "Les listes ne peuvent pas être affichées parce que: " + err.error.message);
    });
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
}
