import { Component, OnInit } from '@angular/core';
import { ListService } from "../../../services/list.service";
import { NgForm } from '@angular/forms';
import { User } from "../../../models/user";
import { List } from 'src/app/models/list';
import { Router, ActivatedRoute } from '@angular/router';
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
  creationDate: Date;
  modifiactionDate: Date;
  user: User;
  picture: { type: "Picture" };
  public: boolean;
  displayedName: string;
  list: List;
  editable: boolean;
  notEditable: boolean;
  idList: string;
  pictures: Picture[] = [];


  constructor(
    // Inject the ListService
    private pictureService: PictureService, private listService: ListService, private router: Router, public alertController: AlertController, public toastController: ToastController, private route: ActivatedRoute, private auth: AuthService
  ) {
    this.idList = this.route.snapshot.paramMap.get('id');
  }

  async newListToast() {
    const toast = await this.toastController.create({
      message: 'Le nom de la liste a bien été modifié',
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

  // Save the new name list in the db
  validateList(form: NgForm) {
    if (form.valid) {
      this.editable = false;
      this.notEditable = true;
      console.log(this.name);

      let name = this.name;
      let idList = this.idList;
      this.listService.updateList(name, null, idList).subscribe(() => {
        this.toast('Le nom de la liste a bien été modifiée');
        this.list.name = this.name;
      },
        (err) => {
          this.toast(err.error.message);
        });
    }
  }

  // Delete a Pic from a List
  deletePicList() {
    // TODO: trouver comment récupérer l'id de la photo :)
    let idPic = this.list.picture;
    this.listService.deletePicList(this.idList, idPic).subscribe(() => {
      // réussite
      this.toast('La photo a bien été supprimée de la liste');
    }, (err) => {
      // échec
      this.toast('La photo n\'a pas pu être supprimée de la liste');
      console.warn(err);
      alert(err.message);
    })
  }

  // Confirmation that the liste is updated
  async updatedListToast() {
    const toast = await this.toastController.create({
      message: 'La liste a bien été modifiée',
      duration: 2000
    });
    toast.present();
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
            console.warn(err);
            alert(err.message);
          })
        }
      }

    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }
}
