import { Component, OnInit } from '@angular/core';
import { ListService } from "../../../services/list.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  name: string;
  creationDate: Date;
  modifiactionDate: Date;
  user: { type: "User" };
  picture: { type: "Picture" };
  public: boolean;
  displayedName: string;
  list: string;


  constructor(
    // Inject the ListService
    private listService: ListService,
  ) { }
  
  validateList(form: NgForm) {
    if (form.valid) {
      // console.log("Liste à enregistrer");
      this.displayedName = this.name;
      let name = this.displayedName;

    }
  }

  ngOnInit() {
    console.log("URL:" + this.listService.currentListURL);
    this.list = this.listService.currentListURL;
    err => {
      console.warn(err);
      alert(err.message);
    }
  };
}


