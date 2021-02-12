import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ToastController } from '@ionic/angular';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private fb: FormBuilder, private listService: ListService, private pictureService: PictureService, public toastController: ToastController, private route: ActivatedRoute) {
    this.idPicture = this.route.snapshot.paramMap.get('id');
  }

  get f() {
    return this.form.controls;
  }

  addPicsList() {
    this.idList = this.form.value;
    console.log(this.form.value);

    Object.prototype.toString = function() {
      let thestring = this.list;
      return thestring;
    };

    this.listService.updateList(undefined, this.idPicture, this.idList).subscribe(() => {
      this.listService.getList(this.idList).subscribe((list) => {
        this.list = list;
        this.toast(`La photo ${this.picture.description} a bien été ajoutée à la liste ${this.list.name}`);
      }, err => {
        console.warn(err);
        this.toast(err.error.message);
      });
    }, (err) => {
      console.warn(err);
      this.toast("La photo n'a pas pu être ajoutée à la liste parce que: " + err.error.message);
    });
  }

  async toast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  ngOnInit() {
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
    }, err => {
      console.warn(err);
      this.toast(err.message);
    });


    this.pictureService.getPicture(this.idPicture).subscribe((picture) => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      this.toast(err.message);
    });

  }

}
