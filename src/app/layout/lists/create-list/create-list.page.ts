import { Component, OnInit } from '@angular/core';
import { ListService } from "../../../services/list.service";
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TabElementsService } from 'src/app/services/tab-elements.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  name: string;

  constructor(
    // Inject the ListService
    private listService: ListService, private router: Router, public alertController: AlertController, public toastController: ToastController, public tabLists: TabElementsService
  ) { }

  // Form validation
  validateList(form: NgForm) {
    if (form.valid) {
      // console.log("Liste à enregistrer");
      let name = this.name;
    //Form creation
      this.listService.createList(name).subscribe(() => {
        this.newListToast();
        this.tabLists.changeList();
        this.router.navigateByUrl("/lists");
      }, err => {
        console.warn(err);
        this.alert("Problème", "Ajout impossible", 'La liste n\'a pas pu être ajoutée parce que: ' + err.error.message);
      });
    }
  }

  // Display creation message
  async newListToast() {
    const toast = await this.toastController.create({
      message: 'La liste a bien été ajoutée',
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
  };
}
