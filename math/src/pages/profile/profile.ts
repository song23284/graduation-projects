import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireModule} from 'angularfire2'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public af : AngularFireModule) {
    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
