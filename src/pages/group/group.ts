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
  firstSignIn: boolean;
  groups = [];
  groupRef = firebase.database().ref('chatgroups/');
  userRef = firebase.database().ref('users/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController) {

    this.user = this.navParams.get('user');
    this.firstSignIn = this.navParams.get('firstSignIn');

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
    this.navCtrl.push(AddGroupPage, {user: this.user});
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
            var user = firebase.auth().currentUser;

            user.updateProfile({
              displayName: data.screenName,
              photoURL: ''
            }).then(function () {
              console.log("Updated display name");
            }).catch (function (err) {
              console.log(err);
            })
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
    // if (childSnapshot.child('groups').getValue() === true) {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      array.push(item);
    // }
  });

  return array;
}
