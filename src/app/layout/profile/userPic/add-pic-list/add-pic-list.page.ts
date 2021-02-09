import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-add-pic-list',
  templateUrl: './add-pic-list.page.html',
  styleUrls: ['./add-pic-list.page.scss'],
})
export class AddPicListPage implements OnInit {
  lists: List;

  constructor(private listService: ListService) { }

    ngOnInit() {
    this.listService.getAllLists().subscribe((list) => {
      this.lists = list;
      console.log(this.lists);
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

}
