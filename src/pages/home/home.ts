import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

import {GroupPage, snapshotToArray} from "../group/group";

import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;         // Declare content module

  data = {
    type: '',
    screenName:'',
    message: ''
  };

  chats = [];
  groupKey: string;
  screenName: string;
  loggedOut: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groupKey = this.navParams.get('key') as string;
    this.screenName = this.navParams.get('screenName') as string;
    this.data.type = 'message';
    this.data.screenName = this.screenName;

    // Write to db
    let joinData = firebase.database().ref('chatgroups/' + this.groupKey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.screenName,
      message: this.screenName + ' has joined this group',
      sendDate: Date()
    });

    this.data.message = '';

    // Read from db
    firebase.database().ref('chatgroups/' + this.groupKey + '/chats').on('value', res => {
      this.chats = [];

      this.chats = snapshotToArray(res);
      setTimeout(() => {
        if (this.loggedOut === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  // Send message and save to db
  sendMessage() {
    let msg = firebase.database().ref('chatgroups/' + this.groupKey+ '/chats').push();

    msg.set({
      type: this.data.type,
      user: this.data.screenName,
      message: this.data.message,
      sendDate: Date()
    });

    this.data.message = '';
  }

  // Log out from current group
  logout() {
    this.loggedOut  = true;

    this.navCtrl.setRoot(GroupPage, {
      screenName: this.screenName
    });
  }
}

// export const snapshotToArray = snapshot => {
//   let returnArr = [];
//
//   snapshot.forEach(childSnapshot => {
//     let item = childSnapshot.val();
//     item.key = childSnapshot.key;
//     returnArr.push(item);
//   });
//
//   return returnArr;
// };
