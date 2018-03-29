import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddGroupPage } from "../add-group/add-group";
import { HomePage } from "../home/home";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  groups = [];
  ref = firebase.database().ref('chatgroups/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // Listen to value changes in firebase db
    this.ref.on('value', res => {
      this.groups = [];
      this.groups = snapshotToArray(res);
    })
  }

  // Navigate to add group page
  addGroup() {
    this.navCtrl.push(AddGroupPage);
  }

  // Join group and navigate to home pg of group
  joinGroup(key) {
    this.navCtrl.setRoot(HomePage, {
      key: key,
      screenName: this.navParams.get('screenName')
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
  })

  return array;
}
