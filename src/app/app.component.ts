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
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.auth.getAuthState().subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");


          this.isLoggedIn = true;
          // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
          // the user did not get redirected to the home page.
          this.router.navigate(['']);
        }
      }
    );
  }

loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

 logout() {
    this.auth.logout();
  }

  

ngOnInit() {
    this.auth.getAuthState().subscribe(
    	(user) => this.user = user);
    	this.topics = this.db.list('/topics');
  }
}