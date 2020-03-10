import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScorecountnumberPage  } from "../scorecountnumber/scorecountnumber";
/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScorePage');
  }

  scorecountnumber(){
    this.navCtrl.push(ScorecountnumberPage);
  }

}
