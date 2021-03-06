import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { AddGroupPage } from "../add-group/add-group";
import { HomePage } from "../home/home";
import { UserDataProvider } from "../../providers/user-data/user-data";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  user;
  email: string;
  userKey: string;
  firstSignIn: boolean;
  groups = [];
  groupRef = firebase.database().ref('chatgroups/');
  userRef = firebase.database().ref('users/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public userData: UserDataProvider) {

    this.user = this.navParams.get('user');
    this.firstSignIn = this.navParams.get('firstSignIn');
    this.email = this.navParams.get('email');
    this.userKey = userData.getUserKey();

    // Let new user enter screen name
    if (this.firstSignIn) {
      this.showAlert();
    }

    // Listen to value changes in firebase db
    this.groupRef.on('value', res => {
      this.groups = [];
      this.groups = snapshotToArray(res);
    });

  }

  // Navigate to add group page
  addGroup() {
    this.navCtrl.push(AddGroupPage, {user: this.userKey});
  }

  // Navigate to home page of group
  joinGroup(group) {
    this.navCtrl.push(HomePage, {
      key: group.key,
      name: group.groupName,
      screenName: this.user.displayName
    });
  }

  // Show alert that lets first-time user input screen name
  showAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Screen Name',
      inputs: [
        {
          name: 'screenName'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {

            // Update user profile
            var user = firebase.auth().currentUser;
            var update = {};

            user.updateProfile({
              displayName: data.screenName,
              photoURL: ''
            }).then(function () {
              console.log('Updated display name');
            }).catch (function (err) {
              console.error(err);
            });

            // Update screen name field in db
            update[this.userKey + '/screenName'] = data.screenName;
            this.userRef.update(update);
          }
        }
      ]
    });
    prompt.present();
  }
}

// Convert firebase response to array
export const snapshotToArray = snapshot => {
  let array = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;

    array.push(item);
  });

  return array;
}
