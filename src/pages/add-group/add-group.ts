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
  userKey;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userKey = this.navParams.get('user');
  }

  // Save new group to db
  addGroup() {
    let newData = this.ref.push();
    newData.set({
      groupName: this.data.groupName
    });

    let groupKey = newData.key;
    let memberRef = firebase.database().ref('chatgroups/' + groupKey);
    let userRef = firebase.database().ref('users/' + this.userKey + '/groups');

    // Add member to chat group
    let newMember = memberRef.child('members');
    newMember.child(this.userKey).set({
      member: true
    });


    // Add group to user
    let userGroup = userRef.push();
    userGroup.set({
      groupName: this.data.groupName
    });

    this.navCtrl.pop();
  }
}
