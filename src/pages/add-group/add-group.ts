import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {

  data = { groupName:'' };
  ref = firebase.database().ref('chatgroups/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // Save new group to db
  addGroup() {
    let newData = this.ref.push();
    newData.set({
      groupName: this.data.groupName
    });
    this.navCtrl.pop();
  }
}
