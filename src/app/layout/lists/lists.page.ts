import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements ViewDidEnter {

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient
  ) {}

  ionViewDidEnter(): void {
    // Make an HTTP request to retrieve the lists.
    const url = "https://odos-archioweb.herokuapp.com/users/5fa158b5e22b7b0017539e6b/lists";
    this.http.get(url).subscribe((lists) => {
      console.log(`Lists loaded`, lists);
    });
  }

}
