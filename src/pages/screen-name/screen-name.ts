import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-screen-name',
  templateUrl: 'screen-name.html',
})
export class ScreenNamePage {
  newScreenName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    // update[]
  }

}
