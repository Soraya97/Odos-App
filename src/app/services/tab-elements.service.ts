import { Injectable } from '@angular/core';
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

  constructor(public pictureService: PictureService, private listService: ListService,) {

    this.pictureService.getAllPictures().subscribe((picture) => {
      this.pictures = picture;
      console.log(this.pictures);
    }, (err) => {
      console.warn(err);
      alert(err.message);
    });

    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
      console.log(this.lists);
    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

  changePic() {
    this.pictureService.getAllPictures().subscribe((picture) => {
      this.pictures = picture;
      console.log(this.pictures);

    }, (err) => {
      console.warn(err);
      alert(err.message);
    });
  }

  changeList() {
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
      console.log(this.lists);
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }
}
