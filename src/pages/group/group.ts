import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddGroupPage } from "../add-group/add-group";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  userKey: string;
  groups = [];
  users = [];
  groupRef = firebase.database().ref('chatgroups/');
  userRef = firebase.database().ref('users/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    /*** ONLY GET CURRENT USER AND THEIR GROUPS ***/

    // Listen to value changes in firebase db
    this.groupRef.on('value', res => {
      this.groups = [];
      this.groups = snapshotToArray(res);
    });

    this.userRef.on('value', res => {
      this.users = [];
      this.users = snapshotToArray(res);
    });

    this.userKey = this.navParams.get('screenName') as string;
  }

  // Navigate to add group page
  addGroup() {
    this.navCtrl.push(AddGroupPage);

    // Add group to user
    var update = {}

    // update['/users/' + ]
    firebase.database().ref().update(update);
  }

  // Join group and navigate to home pg of group
  // Add member to group
  joinGroup(key) {
    let memberRef = firebase.database().ref('members/' + key);
    let newMember = memberRef.push();
    let screenName = this.navParams.get('screenName');

    newMember.set({
      screenName: screenName
    });

    this.navCtrl.push(HomePage, {
      key: key,
      screenName: screenName
    });
  }

  logout() {
    firebase.auth().signOut()
      .then(success => {
        console.log('Log out successful');
        this.navCtrl.setRoot(LoginPage);
      });
  }
}

// Convert firebase response to array
export const snapshotToArray = snapshot => {
  let array = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    array.push(item)
  });

  return array;
}
