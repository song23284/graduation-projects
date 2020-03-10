import { Component } from '@angular/core';
import { NavController, NavParams , App } from 'ionic-angular';
import {HomeparentPage} from '../homeparent/homeparent'
import {MassagePage} from '../massage/massage'
import { LoginPatrentPage } from '../login-patrent/login-patrent';
 

@Component({
  selector: 'page-tabss',
  templateUrl: 'tabss.html',
})
export class TabssPage {
  tab1Root=HomeparentPage;
  tab2Root=MassagePage;
  tab3Root=LoginPatrentPage;

  myIndex:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private app:App) {
               
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabssPage');
  }

  



}
