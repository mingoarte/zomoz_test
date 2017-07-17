import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'lsl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;
  constructor(public afService: AuthService, private router: Router) {}
  
  /**
  * Calls afService.loginWithGoogle() to log in a user.
  * Then send them to the homepage 
  */
  login() {
    this.afService.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    })
  }

  /**
  * Calls afService.loginWithEmail() to log in a user.
  * Then send them to the homepage 
  */
  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
}