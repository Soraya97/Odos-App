import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Picture } from 'src/app/models/pictures';
import {FeedService} from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  sumPictures: number;
  pictures: Picture[];
  sortBy: string;

  constructor(private auth: AuthService,
              private router: Router,
              private wsService: WebsocketService,
              private feedService: FeedService) {
    this.feedService.getAllPictures().subscribe( (pictures) => {
      this.pictures = pictures;
      this.sortBy = 'Date de parution';
      this.sortPicsBy();
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      // this.wsService.refreshPage();
      document.location.reload(true);
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // calculateSumPictures() {
  //   return this.sumPictures = this.pictures.length;
  // }

  ngOnInit() {
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  sortPicsBy() {

    if (this.sortBy === 'Date de parution') {

      this.pictures = this.pictures.sort((a: Picture, b: Picture) =>
          new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
    } else {

      this.pictures = this.pictures.sort( (a, b) => a.userId.username.localeCompare(b.userId.username));
    }
  }


}
