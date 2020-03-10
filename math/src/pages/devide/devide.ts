import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Divideex1Page } from '../divideex1/divideex1';
import { Divideex2Page } from '../divideex2/divideex2';
import { Divideex3Page } from '../divideex3/divideex3';
import { Divideex4Page } from '../divideex4/divideex4';
import { Divideex5Page } from '../divideex5/divideex5';
import { Divideex6Page } from '../divideex6/divideex6';

/**
 * Generated class for the DevidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-devide',
  templateUrl: 'devide.html',
})
export class DevidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevidePage');
  }

  chooseExer1(){
    this.navCtrl.push(Divideex1Page);
  }

  chooseExer2(){
    this.navCtrl.push(Divideex2Page);
  }

  chooseExer3(){
    this.navCtrl.push(Divideex3Page);
  }

  chooseExer4(){
    this.navCtrl.push(Divideex4Page);
  }

  chooseExer5(){
    this.navCtrl.push(Divideex5Page);
  }

  chooseExer6(){
    this.navCtrl.push(Divideex6Page);
  }
}
