import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { PictureService } from 'src/app/services/picture.service';
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
  pictureId: string;

  constructor(private auth: AuthService,
              private router: Router,
              private wsService: WebsocketService,
              private feedService: FeedService, private route: ActivatedRoute) {
    console.log('constructor');
    this.feedService.getAllPictures().subscribe( (pictures) => {
      this.pictures = pictures.sort((a: Picture, b: Picture) =>
          new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
    });
    this.pictureId = this.route.snapshot.paramMap.get('id');
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
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

}
