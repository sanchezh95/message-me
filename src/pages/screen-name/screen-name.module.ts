import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenNamePage } from './screen-name';

@NgModule({
  declarations: [
    ScreenNamePage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenNamePage),
  ],
})
export class ScreenNamePageModule {}
