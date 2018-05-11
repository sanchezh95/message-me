import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-delete-account',
  templateUrl: 'delete-account.html',
})
export class DeleteAccountPage {
  password = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // Re-authenticate and then delete user
  deleteAccount() {
    var that = this;
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.password
    );

    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(function () {
        console.log("User re-authenticated");

        user.delete().then(function () {
          console.log("User deleted");
          that.navCtrl.setRoot(LoginPage);

        }).catch(function (err) {
          console.error(err);
        });

      }).catch(function (err) {
        console.error(err);
    });
  }
}
