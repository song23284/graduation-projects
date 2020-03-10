import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScorecountnumberPage } from '../scorecountnumber/scorecountnumber';
import { ScoreadditionnumberPage } from '../scoreadditionnumber/scoreadditionnumber';

/**
 * Generated class for the ScoremainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-scoremain',
  templateUrl: 'scoremain.html',
})
export class ScoremainPage {

  segment: string = "seg1";
  listitems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoremainPage');
  }

  scorecountnumber(){
    this.navCtrl.push(ScorecountnumberPage);
  }

  scoreaddnumber(){
    this.navCtrl.push(ScoreadditionnumberPage);
  }

}
