import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserDataProvider } from "../../providers/user-data/user-data";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-screen-name',
  templateUrl: 'screen-name.html',
})
export class ScreenNamePage {
  newScreenName = "";
  userKey;
  userRef = firebase.database().ref('users/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userData: UserDataProvider) {
    this.userKey = userData.getUserKey();
  }

  changeScreenName() {
    var user = firebase.auth().currentUser;
    var update = {};

    // Update user profile
    user.updateProfile({
      displayName: this.newScreenName,
      photoURL: ''
    }).then(function () {
      console.log('Changed display name');
    }).catch(function (err) {
      console.error(err);
    });

    // Update screen name in db
    update[this.userKey + '/screenName'] = this.newScreenName;
    this.userRef.update(update);
  }

}
