import { Component, OnInit } from '@angular/core';

// Interface that represent a tab data.
export interface PageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {

  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: "Feed", icon: "home", path: "feed" },
      { title: "Lists", icon: "heart-outline", path: "lists" },
      { title: "Pictures", icon: "add-circle", path: "pictures" },
      { title: "Profile", icon: "person-outline", path: "profile" },
    ];
  }

  ngOnInit() {
  }

}
