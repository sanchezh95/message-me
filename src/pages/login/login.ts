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
  };

  firstSignIn = false;
  user;
  userKey;
  allUsers = [];
  currUser;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // Get all users
    this.ref.on('value', res => {
      this.allUsers = getUserKey(res);
    });
  }

  // Creates new user
  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password)
      .then(success => {
        console.log('Signup successful');

        let newUser = this.ref.push();
        newUser.set({
          email: this.data.email,
          key: newUser.key
        });

        this.firstSignIn = true;
        this.user = firebase.auth().currentUser;
        this.userKey = newUser.key;

        this.enterScreenName(true);
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

        this.user = firebase.auth().currentUser;

        this.enterScreenName(false);
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

  // Go to group page
  enterScreenName(newUser) {

    // Get user key for existing user
    if (newUser === false) {
      let email = this.data.email;
      this.currUser = this.allUsers.filter(function (u) {
        return (u.email === email);
      });

      this.userKey = this.currUser[0].key;
    }

    this.navCtrl.setRoot(GroupPage, {
      user: this.user,
      userKey: this.userKey,
      firstSignIn: this.firstSignIn,
      email: this.data.email
    });
  }
}

// Get user key for returning user
export const getUserKey = snap => {
  let users = [];

  snap.forEach(childSnap => {
    let item = childSnap.val();
    item.key = childSnap.key;
    users.push(item);
  });

  return users;
}
