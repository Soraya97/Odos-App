import { Component, OnInit } from '@angular/core';
import { userPicPage } from 'src/app/layout/profile/userPic/userPic.page';
import { Picture } from 'src/app/models/pictures';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.scss'],
})
export class PicComponent implements OnInit {
  picture: Picture;

  constructor() { }

  ngOnInit() {}

}
