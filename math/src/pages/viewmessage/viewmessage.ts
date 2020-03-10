import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CommentPage} from '../comment/comment'


/**
 * Generated class for the ViewmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewmessage',
  templateUrl: 'viewmessage.html',
})
export class ViewmessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmessagePage');
  }

  comment(){
    this.navCtrl.push(CommentPage);
  }

}
