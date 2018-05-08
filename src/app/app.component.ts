import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";

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
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public navCtrl: NavController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}

