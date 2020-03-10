import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Problemex1Page } from '../problemex1/problemex1';
import { Problemex2Page } from '../problemex2/problemex2';
import { Problemex3Page } from '../problemex3/problemex3';
import { Problemex4Page } from '../problemex4/problemex4';
import { Problemex5Page } from '../problemex5/problemex5';

/**
 * Generated class for the ProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-problem',
  templateUrl: 'problem.html',
})
export class ProblemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemPage');
  }

  chooseExer1(){
    this.navCtrl.push(Problemex1Page)
  }

  chooseExer2(){
    this.navCtrl.push(Problemex2Page)
  }

  chooseExer3(){
    this.navCtrl.push(Problemex3Page)
  }

  chooseExer4(){
    this.navCtrl.push(Problemex4Page)
  }

  chooseExer5(){
    this.navCtrl.push(Problemex5Page)
  }
}
