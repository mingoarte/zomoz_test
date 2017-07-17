import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";


@Component({
  selector: 'lsl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public isLoggedIn: boolean;
  user = null;
  topics: FirebaseListObservable<any[]>;
  
	constructor(
	    public auth: AuthService,
	    public db: AngularFireDatabase,
	    private router: Router) {
		/**
	    * This asynchronously checks if our user is logged it and will automatically
	    * redirect them to the Login page when the status changes.
	    */
	    this.auth.getAuthState().subscribe(
	      (auth) => {
	        if(auth == null) {
	          this.router.navigate(['login']);
	          this.isLoggedIn = false;
	        }
	        else {
	          this.isLoggedIn = true;
	          this.router.navigate(['']);
	        }
	      }
	    );
	  }

	/**
	* Calls the AngularFire2 service to log in user with Google's credentials
	*/
	loginWithGoogle() {
	    this.auth.loginWithGoogle();
	  }

	/**
	* Calls the AngularFire2 service to register a log out user
	*/
	logout() {
	this.auth.logout();
	}

	/**
	* This method is executed at the beginning of the component.
	*/  

	ngOnInit() {
	    this.auth.getAuthState().subscribe(
	    	(user) => this.user = user);
	    	this.topics = this.db.list('/topics');
	  }
}