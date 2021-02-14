import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from "../../models/user";
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TabElementsService } from 'src/app/services/tab-elements.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  user: User;
  list: List;
  lists: List[];
  router: any;
  listId: string;

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    public tabLists: TabElementsService,
    // Inject the ActivatedRoute
    private route: ActivatedRoute
  ) {
    this.listId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    //get and display the users
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }



}
