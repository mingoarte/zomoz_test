import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'lsl-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  private user;
  constructor(public auth: AuthService, private router: Router) {}

  getUserInfo(){
  	return this.user = this.auth.getUserInfo(this.auth.sharedUser);
  }

  edit(event, name, lastName, age, gender, email, id){
    event.preventDefault();
  	this.auth.saveUserInfoFromForm(id, name, lastName, age, gender, email).then(() => {
        this.router.navigate(['']);
    })
  }
  ngOnInit() {
  	this.getUserInfo();
  }

}
