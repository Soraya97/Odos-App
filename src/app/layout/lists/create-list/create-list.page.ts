import { Component, OnInit } from '@angular/core';
import { ListService } from "../../../services/list.service";
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  name: string;
  creationDate: Date;
  modifiactionDate: Date;
  user: { type: "User" };
  picture: { type: "Picture" };
  public: boolean;
  displayedName: string;
  list: string;


  constructor(
    // Inject the ListService
    private listService: ListService, private router: Router, public alertController: AlertController, public toastController: ToastController
  ) { }

  validateList(form: NgForm) {
    if (form.valid) {
      // console.log("Liste à enregistrer");
      let name = this.name;

    this.listService.createList(name).subscribe();
    // TODO: if no errors
    this.newListToast();
    this.router.navigateByUrl("/lists");
  }
}
  async newListToast() {
    const toast = await this.toastController.create({
      message: 'La liste a bien été ajoutée',
      duration: 2000
    });
    toast.present();
  }

  async nameAlreadyTaken() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      subHeader: `Le nom ${this.name} est déjà utilisé`,
      message: "Merci d'en choisir un autre",
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    console.log("URL:" + this.listService.currentListURL);
    this.list = this.listService.currentListURL;

    err => {
      console.warn(err);
      alert(err.message);

    }
  };
}
