import { Component } from '@angular/core';
import { NavController, NavParams ,App} from 'ionic-angular';
import {LoginPatrentPage} from '../login-patrent/login-patrent'
import { ScorePage } from '../score/score';
import {ProfilePage} from '../profile/profile'
import { ScoretestPage } from '../scoretest/scoretest';
import { ScoredailyPage } from '../scoredaily/scoredaily';
import { ProfileparentPage } from '../profileparent/profileparent';
import { ScorecountnumberPage } from '../scorecountnumber/scorecountnumber';
/**
 * Generated class for the HomeparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-homeparent',
  templateUrl: 'homeparent.html',
})
export class HomeparentPage {
  segment: string = "seg1";
  listitems: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeparentPage');
  }

  logout(){
    this.app.getRootNav().push(LoginPatrentPage);
  }

  gotoprofile(){
    this.navCtrl.push(ProfileparentPage);
  }

  /*chooseTest(){
    this.navCtrl.push(ScoretestPage);
  }
  
  chooseexercise(){
    this.navCtrl.push(ScorePage);
  }

  choosedaily(){
    this.navCtrl.push(ScoredailyPage);
  }*/

  scorecountnumber(){
    this.navCtrl.push(ScorecountnumberPage);
  }
}
