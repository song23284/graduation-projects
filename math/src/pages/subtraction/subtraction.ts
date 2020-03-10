import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ex1subPage } from '../ex1sub/ex1sub';
import { Ex2subPage } from '../ex2sub/ex2sub';
import { Ex3subPage } from '../ex3sub/ex3sub';
import { Ex4subPage } from '../ex4sub/ex4sub';
import { Ex5subPage } from '../ex5sub/ex5sub';
import { Ex6subPage } from '../ex6sub/ex6sub';
import { Ex7subPage } from '../ex7sub/ex7sub';

/**
 * Generated class for the SubtractionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subtraction',
  templateUrl: 'subtraction.html',
})
export class SubtractionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubtractionPage');
  }

  chooseExer1(){
    this.navCtrl.push(Ex1subPage);
  }

  chooseExer2(){
    this.navCtrl.push(Ex2subPage);
  }

  chooseExer3(){
    this.navCtrl.push(Ex3subPage);
  }

  chooseExer4(){
    this.navCtrl.push(Ex4subPage);
  }

  chooseExer5(){
    this.navCtrl.push(Ex5subPage);
  }

  chooseExer6(){
    this.navCtrl.push(Ex6subPage);
  }

  chooseExer7(){
    this.navCtrl.push(Ex7subPage);
  }
}
