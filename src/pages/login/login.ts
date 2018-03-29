import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupPage } from '../group/group';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data = { screenName: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  enterScreenName() {
    this.navCtrl.setRoot(GroupPage, {
      screenName: this.data.screenName
    });
  }

}
