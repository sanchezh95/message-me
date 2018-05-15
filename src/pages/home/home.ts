import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

import {snapshotToArray} from "../group/group";

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
  groupName: string;
  screenName: string;
  loggedOut: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groupKey = this.navParams.get('key') as string;
    this.groupName = this.navParams.get('name');
    this.screenName = this.navParams.get('screenName') as string;
    this.data.type = 'message';
    this.data.screenName = this.screenName;

    // Write to db
    let joinData = firebase.database().ref('messages/' + this.groupKey).push();
    joinData.set({
      type: 'join',
      user: this.screenName,
      message: this.screenName + ' has joined this group',
      sendDate: Date()
    });

    this.data.message = '';

    // Read from db
    firebase.database().ref('messages/' + this.groupKey).on('value', res => {
      this.chats = [];

      this.chats = snapshotToArray(res);
      setTimeout(() => {
        if (this.loggedOut === false || this.content) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  // Send message and save to db
  sendMessage() {
    let msg = firebase.database().ref('messages/' + this.groupKey).push();

    msg.set({
      type: this.data.type,
      user: this.data.screenName,
      message: this.data.message,
      sendDate: Date()
    });

    this.data.message = '';
  }

  // Log out from current group
  exitGroup() {
    let exitData = firebase.database().ref('messages/' + this.groupKey).push();

    exitData.set({
      type: 'exit',
      user: this.screenName,
      message: this.screenName+' has left the group.',
      sendDate: Date()
    });

    this.loggedOut = true;

    this.navCtrl.pop();
  }
}
