import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;

  constructor(private userService: UserService) {
    // this.user = {_id: "1", username: "John Doe", email: "a@a.ch", password: "1234", registrationDate: "12.01.2021"};
  }

  addUser(): void {
    this.userService.getUser().subscribe((user) => {
      return this.user;
    }, err => {
      console.warn(err);
      alert(err.message);
    });
  }

  ngOnInit() {
  }

}
