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

  getUsers(){
    return this.users = this.auth.getAllUsers();
  }

  edit(id){
    this.auth.sharedUser = id;
    this.router.navigate(['edit']);
  }
  delete(id){
    this.auth.deleteUser(id).then(() => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.getUsers();

  }

}
