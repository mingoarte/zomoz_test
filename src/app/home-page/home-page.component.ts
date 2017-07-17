import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'lsl-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private users;
  constructor(public auth: AuthService, private router: Router) {}

  /**
  * Calls auth.getAllUsers() to get a list of users
  */
  getUsers(){
    return this.users = this.auth.getAllUsers();
  }

  /**
  * Assign a user.id to auth.sharedUser and then navigate to edit component
  */
  edit(id){
    this.auth.sharedUser = id;
    this.router.navigate(['edit']);
  }

  /**
  * Calls auth.deleteUser() to erase a user by id.
  * Then get a list of users
  */
  delete(id){
    this.auth.deleteUser(id).then(() => {
      this.getUsers();
    });
  }

  /**
  * This method is executed at the beginning of the component.
  */
  ngOnInit() {
    this.getUsers();

  }

}
