import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

var firebaseConfig = ({
    apiKey: "AIzaSyCJGejKt80qwHqjgVaqEQIypJFLLDOCppo",
    authDomain: "fir-crud-67d98.firebaseapp.com",
    databaseURL: "https://fir-crud-67d98.firebaseio.com",
    projectId: "fir-crud-67d98",
    storageBucket: "fir-crud-67d98.appspot.com",
    messagingSenderId: "441249106742"
  })
var FbApp = firebase.initializeApp(firebaseConfig);



@Injectable()
export class AuthService {
  public sharedUser: string;
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;
constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }
  getAuthState() {
    return this.authState;
  }
  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  logout() {
     return this.afAuth.auth.signOut();
  }


/**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email)
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }
  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, lastName, age, gender, email) {
    return FbApp.database().ref('registeredUsers/' + uid).set({
      name: name,
      lastName: lastName,
      age: age,
      gender: gender,
      email: email,
    });
  }

  getAllUsers(){
    var db = FbApp.database().ref('registeredUsers/');
    var users = []
    db.orderByChild('name').on("child_added", function(snapshot) {
      users.push(snapshot);
    });
    return users
  }

  deleteUser(id){
    return FbApp.database().ref('registeredUsers/'+id).remove();
  }

  getUserInfo(id){
    var db = FbApp.database().ref('registeredUsers/');
    var user
    db.orderByKey().equalTo(id).on("child_added", function(snapshot) {
      user = snapshot;
    });
    return user;
  }
   /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}