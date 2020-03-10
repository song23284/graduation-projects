import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import {LoginPatrentPage} from '../login-patrent/login-patrent'
import { ViewmessagePage } from '../viewmessage/viewmessage';
import { ViewsendPage } from '../viewsend/viewsend';
import { ProfileparentPage } from '../profileparent/profileparent';


@Component({
  selector: 'page-massage',
  templateUrl: 'massage.html',
})
export class MassagePage {

  segment: string = "seg1";
  listitems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MassagePage');
  }

  comment(){
    this.navCtrl.push(CommentPage);
  }

  logout(){
    this.app.getRootNav().push(LoginPatrentPage);
  }

  gotoview(){
    this.navCtrl.push(ViewmessagePage);
  }

  gotoviewsend(){
    this.navCtrl.push(ViewsendPage);
  }

  gotoprofile(){
    this.navCtrl.push(ProfileparentPage);
  }

  

}
