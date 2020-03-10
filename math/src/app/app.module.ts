import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {MyApp} from "./app.component";
import firebase from 'firebase';

///page in mobile application
import {SettingPage} from "../pages/setting/setting";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {ExercisePage} from "../pages/exercise/exercise";
import {CountNumber_1Page} from "../pages/count-number-1/count-number-1";
import {Addition_1Page} from "../pages/addition-1/addition-1";

import {Add1Exer1Page} from "../pages/add1-exer1/add1-exer1";
import {Add1Exer2Page} from "../pages/add1-exer2/add1-exer2";
import {Add1Exer3Page} from "../pages/add1-exer3/add1-exer3";
import {TestPage} from "../pages/test/test";
import {DailyPage} from "../pages/daily/daily";
import { ProfilePage } from "../pages/profile/profile";
import { ScorePage } from "../pages/score/score";
import { ScorecountnumberPage  } from "../pages/scorecountnumber/scorecountnumber";
import { Compare1Page  } from "../pages/compare1/compare1";
import { Compare1Exer1Page  } from "../pages/compare1-exer1/compare1-exer1";
import { Compare1Exer2Page  } from "../pages/compare1-exer2/compare1-exer2";
import { CompareExer3Page  } from "../pages/compare-exer3/compare-exer3";
import { CompareExer4Page  } from "../pages/compare-exer4/compare-exer4";
import { CompareExer5Page  } from "../pages/compare-exer5/compare-exer5";
import { CompareExer6Page  } from "../pages/compare-exer6/compare-exer6";
import { CompareExer7Page  } from "../pages/compare-exer7/compare-exer7";

import { Pattern1Page } from "../pages/pattern1/pattern1";
import { Pattern1Exer1Page } from "../pages/pattern1-exer1/pattern1-exer1";
import {PatternExer2Page} from '../pages/pattern-exer2/pattern-exer2';
import {PatternExer3Page} from '../pages/pattern-exer3/pattern-exer3';
import {PatternExer4Page} from '../pages/pattern-exer4/pattern-exer4';
import {PatternExer5Page} from '../pages/pattern-exer5/pattern-exer5';
import { LoginPatrentPage } from "../pages/login-patrent/login-patrent";
import { HomeparentPage} from "../pages/homeparent/homeparent";
import {MenuPage} from '../pages/menu/menu';
import {TabssPage} from '../pages/tabss/tabss';
import {MassagePage} from '../pages/massage/massage';
import {CommentPage} from '../pages/comment/comment';
import {ProgressEx1Page} from '../pages/progress-ex1/progress-ex1';
import {ScoretestPage} from '../pages/scoretest/scoretest';
import {ScoredailyPage} from '../pages/scoredaily/scoredaily';
import {ViewmessagePage} from '../pages/viewmessage/viewmessage';
import {ViewsendPage} from '../pages/viewsend/viewsend';
import {ProfileparentPage} from '../pages/profileparent/profileparent';
import {ScoremainPage} from '../pages/scoremain/scoremain';
import {RegisterparentPage} from '../pages/registerparent/registerparent';
import {ScoreadditionnumberPage} from '../pages/scoreadditionnumber/scoreadditionnumber';
import {SubtractionPage} from '../pages/subtraction/subtraction';
import {MultipliesPage} from '../pages/multiplies/multiplies'
import {DevidePage} from '../pages/devide/devide';
import {RelationPage} from '../pages/relation/relation';
import {ProblemPage} from '../pages/problem/problem';
import {Ex1counterPage} from  '../pages/ex1counter/ex1counter';
import {Ex2counterPage} from '../pages/ex2counter/ex2counter';
import {Ex3counterPage} from '../pages/ex3counter/ex3counter';
import {Ex4counterPage} from '../pages/ex4counter/ex4counter';
import {Ex5counterPage} from '../pages/ex5counter/ex5counter';
import {Ex6counterPage} from '../pages/ex6counter/ex6counter';
import {Add1Exer4Page} from '../pages/add1-exer4/add1-exer4';
import {Add1Exer5Page} from  '../pages/add1-exer5/add1-exer5';
import {Add1Exer6Page} from  '../pages/add1-exer6/add1-exer6';
import {Add1Exer7Page} from  '../pages/add1-exer7/add1-exer7';
import {Ex1subPage} from '../pages/ex1sub/ex1sub';
import {Ex2subPage} from '../pages/ex2sub/ex2sub';
import {Ex3subPage} from '../pages/ex3sub/ex3sub';
import {Ex4subPage} from '../pages/ex4sub/ex4sub';
import {Ex5subPage} from '../pages/ex5sub/ex5sub';
import {Ex6subPage} from '../pages/ex6sub/ex6sub';
import {Ex7subPage} from '../pages/ex7sub/ex7sub';
import {Multipliesex1Page} from '../pages/multipliesex1/multipliesex1';
import {Multipliesex2Page} from '../pages/multipliesex2/multipliesex2';
import {Multipliesex3Page} from '../pages/multipliesex3/multipliesex3';
import {Multipliesex4Page} from '../pages/multipliesex4/multipliesex4';
import {Multipliesex5Page} from '../pages/multipliesex5/multipliesex5';
import {Multipliesex6Page} from '../pages/multipliesex6/multipliesex6';
import {Divideex1Page} from '../pages/divideex1/divideex1';
import {Divideex2Page} from '../pages/divideex2/divideex2';
import {Divideex3Page} from '../pages/divideex3/divideex3';
import {Divideex4Page} from '../pages/divideex4/divideex4';
import {Divideex5Page} from '../pages/divideex5/divideex5';
import {Divideex6Page} from '../pages/divideex6/divideex6';
import {Problemex1Page} from '../pages/problemex1/problemex1';
import {Problemex2Page} from '../pages/problemex2/problemex2';
import {Problemex3Page} from '../pages/problemex3/problemex3';
import {Problemex4Page} from '../pages/problemex4/problemex4';
import {Problemex5Page} from '../pages/problemex5/problemex5';


/////Agularfirebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HttpModule } from '@angular/http';
import { Exercise1Provider } from '../providers/exercise1/exercise1';
//import { DataServiceProvider } from '../providers/data-service/data-service';
//import { Facebook } from '@ionic-native/facebook'
//import { AuthProvider } from '../providers/auth/auth';


///////code 
/*const config  = {
  apiKey: "AIzaSyA9Z5QFoqkT9Oc5Cr3UeIt40WKsc3jAOx0",
  authDomain: "testject1234.firebaseapp.com",
  databaseURL: "https://testject1234.firebaseio.com",
  projectId: "https://console.firebase.google.com/u/0/project/testject1234/overview",
  storageBucket: "testject1234.appspot.com",
  messagingSenderId: "435539620579"
};*/

////test project
const config = {
  apiKey: "AIzaSyBOGusn13X2Pe6BlKjy7-xy0PkdnUyoGFM",
  authDomain: "mathapp-128.firebaseapp.com",
  databaseURL: "https://mathapp-128.firebaseio.com",
  projectId: "mathapp-128",
  storageBucket: "mathapp-128.appspot.com",
  messagingSenderId: "454621296943"
};

firebase.initializeApp(config);////for app.html


// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ExercisePage,
    CountNumber_1Page,
    Addition_1Page,
    Add1Exer1Page,
    Add1Exer2Page,
    Add1Exer3Page,
    Add1Exer4Page,
    Add1Exer5Page,
    Add1Exer6Page,
    Add1Exer7Page,
    TestPage,
    DailyPage,
    ProfilePage,
    ScorePage,
    ScorecountnumberPage ,
    Compare1Page ,
    Compare1Exer1Page,
    Compare1Exer2Page,
    CompareExer3Page,
    CompareExer4Page,
    CompareExer5Page,
    CompareExer6Page,
    CompareExer7Page,
    Pattern1Page,
    Pattern1Exer1Page,
    PatternExer2Page,
    PatternExer3Page,
    PatternExer4Page,
    PatternExer5Page,
    LoginPatrentPage,
    HomeparentPage ,
    MenuPage,
    TabssPage,
    MassagePage,
    CommentPage,
    ProgressEx1Page,
    ScoretestPage,
    ScoredailyPage,
    ViewmessagePage,
    ViewsendPage,
    ProfileparentPage,
    ScoremainPage,
    RegisterparentPage,
    ScoreadditionnumberPage,
    SubtractionPage,
    MultipliesPage,
    DevidePage,
    RelationPage,
    ProblemPage,
    Ex1counterPage,
    Ex2counterPage,
    Ex3counterPage,
    Ex4counterPage,
    Ex5counterPage,
    Ex6counterPage,
    Ex1subPage,
    Ex2subPage,
    Ex3subPage,
    Ex4subPage,
    Ex5subPage,
    Ex6subPage,
    Ex7subPage,
    Multipliesex1Page,
    Multipliesex2Page,
    Multipliesex3Page,
    Multipliesex4Page,
    Multipliesex5Page,
    Multipliesex6Page,
    Divideex1Page,
    Divideex2Page,
    Divideex3Page,
    Divideex4Page,
    Divideex5Page,
    Divideex6Page,
    Problemex1Page,
    Problemex2Page,
    Problemex3Page,
    Problemex4Page,
    Problemex5Page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
     AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ExercisePage,
    CountNumber_1Page,
    Add1Exer2Page,
    Add1Exer3Page,
    Addition_1Page,
    Add1Exer1Page,
    Add1Exer4Page,
    Add1Exer5Page,
    Add1Exer6Page,
    Add1Exer7Page,
    TestPage,
    DailyPage,
    ProfilePage,
    ScorePage,
    ScorecountnumberPage ,
    Compare1Page ,
    Compare1Exer1Page ,
    Compare1Exer2Page,
    CompareExer3Page,
    CompareExer4Page,
    CompareExer5Page,
    CompareExer6Page,
    CompareExer7Page,
    Pattern1Page,
    Pattern1Exer1Page ,
    LoginPatrentPage,
    HomeparentPage,
    MenuPage,
    TabssPage,
    MassagePage,
    CommentPage,
    ProgressEx1Page,
    ScoretestPage,
    ScoredailyPage,
    ViewmessagePage,
    ViewsendPage,
    ProfileparentPage,
    ScoremainPage,
    RegisterparentPage,
    ScoreadditionnumberPage,
    SubtractionPage,
    MultipliesPage,
    DevidePage,
    RelationPage,
    ProblemPage,
    Ex1counterPage,
    Ex2counterPage,
    Ex3counterPage,
    Ex4counterPage,
    Ex5counterPage,
    Ex6counterPage,
    Ex1subPage,
    Ex2subPage,
    Ex3subPage,
    Ex4subPage,
    Ex5subPage,
    Ex6subPage,
    Ex7subPage,
    Multipliesex1Page,
    Multipliesex2Page,
    Multipliesex3Page,
    Multipliesex4Page,
    Multipliesex5Page,
    Multipliesex6Page,
    Divideex1Page,
    Divideex2Page,
    Divideex3Page,
    Divideex4Page,
    Divideex5Page,
    Divideex6Page,
    Problemex1Page,
    Problemex2Page,
    Problemex3Page,
    Problemex4Page,
    Problemex5Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Exercise1Provider
  ]
})

export class AppModule {
}

