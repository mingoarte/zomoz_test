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


	/**
	* Calls auth.getUserInfo() with auth.sharedUser as parameter
	*/
	getUserInfo(){
		return this.user = this.auth.getUserInfo(this.auth.sharedUser);
	}

	/**
	* Calls auth.saveUserInfoFromForm() to change user attributes
	*/
	edit(event, name, lastName, age, gender, email, id){
		event.preventDefault();
		this.auth.saveUserInfoFromForm(id, name, lastName, age, gender, email).then(() => {
		    this.router.navigate(['']);
		})
	}

	/**
	* This method is executed at the beginning of the component.
	*/
	ngOnInit() {
		this.getUserInfo();
	}

}
