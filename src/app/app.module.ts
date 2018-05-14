import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from "../pages/login/login";
import { GroupPage } from "../pages/group/group";
import { AddGroupPage } from "../pages/add-group/add-group";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ScreenNamePage } from "../pages/screen-name/screen-name";
import { DeleteAccountPage } from "../pages/delete-account/delete-account";
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    GroupPage,
    AddGroupPage,
    NotificationsPage,
    ScreenNamePage,
    DeleteAccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    GroupPage,
    AddGroupPage,
    NotificationsPage,
    ScreenNamePage,
    DeleteAccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider
  ]
})
export class AppModule {}
