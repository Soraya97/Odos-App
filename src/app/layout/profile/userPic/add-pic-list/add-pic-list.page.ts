import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ToastController } from '@ionic/angular';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-pic-list',
  templateUrl: './add-pic-list.page.html',
  styleUrls: ['./add-pic-list.page.scss'],
})
export class AddPicListPage implements OnInit {
  lists: List;
  ids: string[];
  idPicture: string;
  picture: Picture;
  list: string;
  idList: string;

  constructor(private listService: ListService, private pictureService: PictureService, public toastController: ToastController) {

    let urlcourante = document.location.href;
    urlcourante = urlcourante.replace(/\/$/, "");
    this.idPicture = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
    console.log(this.idPicture);

    // this.idList = "602273117b36d20017fb416e";
  }

  addPicsList(form: NgForm) {
    if (form.valid) {

      for (let i = 0; i < 4; i++) {
        let radioChecked = <HTMLInputElement>document.getElementById(this.lists[i]._id);

        if (radioChecked.checked = true) {
          console.log("It's checked");
          // Get the name of list
          let nameList = radioChecked.value;
          // Get the id of list
          let idList = radioChecked.name;
          this.list = nameList;
          this.idList = idList;
        } else {
          console.log("Not checked");
        }

      }
      // this.listService.updateList(undefined, this.idPicture, this.idList).subscribe(err => {
      //   console.warn(err);
      //   // alert(err.message);
      // });
      this.addToListToast();
    }
  }

  async addToListToast() {
    const toast = await this.toastController.create({
      message: `La photo ${this.picture.description} a bien été ajoutée à la liste ${this.list}`,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
      console.log(this.lists);
    }, err => {
      console.warn(err);
      alert(err.message);
    });


    this.pictureService.getPicture(this.idPicture).subscribe((picture) => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

}
