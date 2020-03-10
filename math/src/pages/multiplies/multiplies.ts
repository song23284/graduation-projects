import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Multipliesex1Page } from '../multipliesex1/multipliesex1';
import { Multipliesex2Page } from '../multipliesex2/multipliesex2';
import { Multipliesex3Page } from '../multipliesex3/multipliesex3';
import { Multipliesex4Page } from '../multipliesex4/multipliesex4';
import { Multipliesex5Page } from '../multipliesex5/multipliesex5';
import { Multipliesex6Page } from '../multipliesex6/multipliesex6';

/**
 * Generated class for the MultipliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-multiplies',
  templateUrl: 'multiplies.html',
})
export class MultipliesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultipliesPage');
  }

  chooseExer1(){
    this.navCtrl.push(Multipliesex1Page);
  }

  chooseExer2(){
    this.navCtrl.push(Multipliesex2Page);
  }

  chooseExer3(){
    this.navCtrl.push(Multipliesex3Page);
  }

  chooseExer4(){
    this.navCtrl.push(Multipliesex4Page);
  }

  chooseExer5(){
    this.navCtrl.push(Multipliesex5Page);
  }

  chooseExer6(){
    this.navCtrl.push(Multipliesex6Page);
  }

}
