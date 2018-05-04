import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

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

  user;
  email: string;
  userKey: string;
  firstSignIn: boolean;
  groups = [];
  groupRef = firebase.database().ref('chatgroups/');
  userRef = firebase.database().ref('users/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController) {

    this.user = this.navParams.get('user');
    this.userKey = this.navParams.get('userKey');
    console.log('===============', this.userKey);
    this.firstSignIn = this.navParams.get('firstSignIn');
    this.email = this.navParams.get('email');

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
    console.log('add group: ',  this.userKey);
    this.navCtrl.push(AddGroupPage, {user: this.userKey});
  }

  // Join group and navigate to home pg of group
  // Add member to group
  joinGroup(key) {
    let memberRef = firebase.database().ref('members/' + key);
    let newMember = memberRef.push();

    newMember.set({
      screenName: this.user.displayName
    });

    this.navCtrl.push(HomePage, {
      key: key,
      screenName: this.user.displayName
    });
  }

  logout() {
    firebase.auth().signOut()
      .then(success => {
        console.log('Log out successful');
        this.navCtrl.setRoot(LoginPage);
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
              console.log("Updated display name");
            }).catch (function (err) {
              console.log(err);
            })

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
