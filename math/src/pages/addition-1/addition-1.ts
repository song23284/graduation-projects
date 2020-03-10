import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import {Add1Exer1Page} from "../add1-exer1/add1-exer1";
import {Add1Exer2Page} from "../add1-exer2/add1-exer2";
import {Add1Exer3Page} from "../add1-exer3/add1-exer3"
import { Add1Exer4Page } from '../add1-exer4/add1-exer4';
import { Add1Exer5Page } from '../add1-exer5/add1-exer5';
import { Add1Exer6Page } from '../add1-exer6/add1-exer6';
import { Add1Exer7Page } from '../add1-exer7/add1-exer7';
/**
 * Generated class for the Addition_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addition-1',
  templateUrl: 'addition-1.html',
})
export class Addition_1Page {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addition_1Page');
  }

  chooseExer1() {
    this.nav.push(Add1Exer1Page);
  }

  chooseExer2(){
    this.nav.push(Add1Exer2Page);
  }

  chooseExer3(){
    this.nav.push(Add1Exer3Page);
  }
  
  chooseExer4(){
    this.nav.push(Add1Exer4Page);
  }

  chooseExer5(){
    this.nav.push(Add1Exer5Page);
  }

  chooseExer6(){
    this.nav.push(Add1Exer6Page);
  }

  chooseExer7(){
    this.nav.push(Add1Exer7Page);
  }


}
