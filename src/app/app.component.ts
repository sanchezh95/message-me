import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDordP6ifO13AeRNVbCsNGOEXoCo-wkx54",
  authDomain: "message-me-d8f9a.firebaseapp.com",
  databaseURL: "https://message-me-d8f9a.firebaseio.com",
  projectId: "message-me-d8f9a",
  storageBucket: "message-me-d8f9a.appspot.com",
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

