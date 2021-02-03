import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "src/app/auth/auth.service";
import { WebsocketService } from 'src/app/services/websocket.service';
import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/app/models/pictures';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  sumPictures: number;
  pictures: Picture[];

  constructor(private auth: AuthService, private router: Router, private wsService: WebsocketService, private pictureService: PictureService) {
    // this.wsService
    //   .listen()
    //   .subscribe(message => {
    //     // Do something when a message is received
    //   });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.wsService.refreshPage();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // calculateSumPictures() {
  //   return this.sumPictures = this.pictures.length;
  // }

  ngOnInit() {
    // this.pictureService.getAllPictures().subscribe((picture) => {
    //   this.pictures.push(picture);
    // }, err => {
    //   console.warn(err);
    //   alert(err.message);
    // });
    // this.calculateSumPictures();
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}
