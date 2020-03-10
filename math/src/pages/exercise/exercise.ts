import { Component } from '@angular/core';
import { NavController, NavParams,PopoverController } from 'ionic-angular';


import {CountNumber_1Page} from "../count-number-1/count-number-1";
import {Addition_1Page} from "../addition-1/addition-1";
import { Compare1Page  } from "../compare1/compare1";
import { Pattern1Page } from "../pattern1/pattern1";
import { SubtractionPage } from '../subtraction/subtraction';
import { MultipliesPage } from '../multiplies/multiplies';
import { DevidePage } from '../devide/devide';
import { ProblemPage } from '../problem/problem';

/**
 *
 * Generated class for the ExercisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage {

  constructor(public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  chooseCount() {
    this.nav.push(CountNumber_1Page);
  }

  chooseAdd() {
    this.nav.push(Addition_1Page );
  }

  chooseSub() {
    this.nav.push(SubtractionPage );
  }

  chooseMul() {
    this.nav.push(MultipliesPage );
  }
  choosedev() {
    this.nav.push(DevidePage );
  }

  choosePro() {
    this.nav.push(ProblemPage );
  }

 
  choosecompare(){
    this.nav.push(Compare1Page);
  }

  choosepattern(){
    this.nav.push(Pattern1Page);
  }

}
