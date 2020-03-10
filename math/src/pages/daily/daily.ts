import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {Storage} from '@ionic/storage'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html',
})

export class DailyPage {
  
  segment: string = "seg1";
  listitems: any;


  constructor(public nav: NavController, private storage: Storage) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyPage');
  }





}
