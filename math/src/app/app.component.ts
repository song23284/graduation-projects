import { Component, ViewChild } from "@angular/core";
import { Platform, Nav , Events} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { ProfilePage} from "../pages/profile/profile";
import { SettingPage} from "../pages/setting/setting";
import { ScoremainPage } from "../pages/scoremain/scoremain";
import {DailyPage} from "../pages/daily/daily"
import {TestPage} from "../pages/test/test"
import {ExercisePage} from "../pages/exercise/exercise"
import firebase from 'firebase';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage ;

  appMenuItems: Array<MenuItem>;
  appExItem : Array<MenuItem>;
  user:any;
  displayname;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
   public storage: Storage
  ) {

     /*storage.get('displayName').then((val) => {
      console.log(val);
      this.displayname=val;

    });*/

      firebase.auth().onAuthStateChanged((user)=>{
        this.displayname = user.displayName;
          console.log("displayname"+user.displayName);
      });

    
    
    this.initializeApp();

    this.appExItem=[
      {title: 'แบบทดสอบ', component: TestPage, icon: 'paper'},
      {title: 'แบบฝึกหัดเลือกเอง', component: ExercisePage, icon: 'paper'},
      {title: 'แบบฝึกหัดทำทุกวัน', component: DailyPage, icon: 'paper'} 
    ];

    this.appMenuItems = [
      {title: 'ข้อมูลส่วนตัว', component: ProfilePage, icon: 'ios-person-outline'},
      {title: 'คะแนน', component: ScoremainPage, icon: 'stats'}
    ];
 
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    firebase.auth().signOut()
    .then((user)=>{
      this.nav.setRoot(LoginPage);
      console.log('logout')
     

    });
  }





}
