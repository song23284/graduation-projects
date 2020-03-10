import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//page import
import { Pattern1Exer1Page } from "../pattern1-exer1/pattern1-exer1";
/**
 * Generated class for the Pattern1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pattern1',
  templateUrl: 'pattern1.html',
})
export class Pattern1Page {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pattern1Page');
  }

  chooseExer1(){
    this.nav.push(Pattern1Exer1Page);
  }

}
