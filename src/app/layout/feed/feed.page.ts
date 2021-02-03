import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "src/app/auth/auth.service";
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private auth: AuthService, private router: Router, private wsService: WebsocketService) {
    // this.wsService
    //   .listen()
    //   .subscribe(message => {
    //     // Do something when a message is received
    //   });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}
