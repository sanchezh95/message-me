import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupPage } from '../group/group';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  ref = firebase.database().ref('users/');
  data = {
    email: "",
    password: "",
    screenName: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // Creates new user
  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password)
      .then(success => {
        console.log('Signup successful');
        let newUser = this.ref.push();
        newUser.set({
          screenName: this.data.screenName,
          email: this.data.email,
          groups: []
        });
        this.enterScreenName();
      })

      .catch(function(err) {
        var errCode = err.code;
        var errMsg = err.message;
        if (errCode === 'auth/weak-password') {
          alert('The password is too weak');
        } else {
          alert(errMsg);
        }
        console.log(err)
      });
  }

  // Login existing user
  login() {
    firebase.auth().signInWithEmailAndPassword(this.data.email, this.data.password)
      .then(success => {
        console.log('Login successful');
        this.enterScreenName();
      })
      .catch(function(err) {
        var errCode = err.code;
        var errMsg = err.message;
        if (errCode === 'auth/wrong-password') {
          alert('Wrong password');
        } else {
          alert(errMsg);
        }
        console.log(err);
      });
  }

  enterScreenName() {
    this.navCtrl.setRoot(GroupPage, {
      screenName: this.data.screenName
    });
  }

}
