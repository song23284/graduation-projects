import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//page import
import { Compare1Exer1Page  } from "../compare1-exer1/compare1-exer1";
import { Compare1Exer2Page  } from "../compare1-exer2/compare1-exer2";
import { CompareExer3Page } from '../compare-exer3/compare-exer3';
import { CompareExer4Page } from '../compare-exer4/compare-exer4';
import { CompareExer5Page } from '../compare-exer5/compare-exer5';
import { CompareExer6Page } from '../compare-exer6/compare-exer6';
import { CompareExer7Page } from '../compare-exer7/compare-exer7';

/**
 * Generated class for the Compare1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-compare1',
  templateUrl: 'compare1.html',
})
export class Compare1Page {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Compare1Page');
  }

  chooseExer2(){
    this.nav.push(Compare1Exer1Page );
  }

  chooseExer1(){
    this.nav.push(Compare1Exer2Page );
  }

  chooseExer3(){
    this.nav.push(CompareExer3Page);
  }

  chooseExer4(){
    this.nav.push(CompareExer4Page);
  }
  chooseExer5(){
    this.nav.push(CompareExer5Page);
  }
  chooseExer6(){
    this.nav.push(CompareExer6Page);
  }
  chooseExer7(){
    this.nav.push(CompareExer7Page);
  }  

}
