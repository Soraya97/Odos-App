import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ViewDidEnter } from '@ionic/angular';
import { User } from "../../models/user";
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  user: User;
  list: List;
  lists: List;
  router: any;

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    // Inject the ListService
    private listService: ListService
  ) { }

  getId(id) {
    console.log(id);
    // TROUVER COMMENT REDIRIGER L'UTILISATEUR 
  }


  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
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

  // ionViewDidEnter(): void {
  //   // Make an HTTP request to retrieve the lists.
  //   const url = `${environment.apiUrl}/users/5fa158b5e22b7b0017539e6b/lists`;
  //   this.http.get(url).subscribe((lists) => {
  //     console.log(`Lists loaded`, lists);
  //   });
  // }

}
