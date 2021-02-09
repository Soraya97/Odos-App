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
  ids: string[];
  idPicture: string;

  constructor(private listService: ListService) {

    let urlcourante = document.location.href;
    urlcourante = urlcourante.replace(/\/$/, "");
    this.idPicture = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
    console.log(this.idPicture);

  }

  addPicsList() {
    console.log("BRUH");
    // for (let i = 0; i < 2; i++) {
    //   let elements = document.getElementById(this.lists[i]._id);
    //   elements = elements.checked;
    //   elements = elements.value;
    //   console.log(elements);
    // }
    let idList = "602273117b36d20017fb416e";
    let name = "Test";
    this.listService.updateList(name, this.idPicture, idList).subscribe(err => {
      console.warn(err);
      // alert(err.message);
    });

  }

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
