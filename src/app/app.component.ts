import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ScreenNamePage } from "../pages/screen-name/screen-name";
import { DeleteAccountPage } from "../pages/delete-account/delete-account";

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDordP6ifO13AeRNVbCsNGOEXoCo-wkx54",
  authDomain: "message-me-d8f9a.firebaseapp.com",
  databaseURL: "https://message-me-d8f9a.firebaseio.com",
  projectId: "message-me-d8f9a",
  storageBucket: "message-me-d8f9a.appspot.com",
  messagingSenderId: "394252042734"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);

    this.pages = [
      { title: 'Notifications', component: NotificationsPage },
      { title: 'Change Screen Name', component: ScreenNamePage },
      { title: 'Delete Account', component: DeleteAccountPage }
    ];
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}

