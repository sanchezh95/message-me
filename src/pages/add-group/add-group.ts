import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {

  data = { groupName: '' };
  ref = firebase.database().ref('chatgroups/');
  userRef = firebase.database().ref('users/');
  user;
  userKey;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');

    this.userRef.orderByChild('screenName').equalTo(this.user.displayName)
      .once('value').then(function (snap) {
      console.log(snap.val());
      // this.userKey = snap.key;
    });
  }

  // Save new group to db
  addGroup() {
    let newData = this.ref.push();
    newData.set({
      groupName: this.data.groupName,
    });

    // Add user to group
    var update = {};
    update[this.userKey + '/groups/' + this.data.groupName] = true;
    this.userRef.update(update);

    this.navCtrl.pop();
  }
}
