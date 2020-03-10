import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import 'rxjs/add/observable/interval';
import { HttpClient } from '@angular/common/http';


import { Ex1counterPage } from '../ex1counter/ex1counter';
import { Ex2counterPage } from '../ex2counter/ex2counter';
import { Ex3counterPage } from '../ex3counter/ex3counter';
import { Ex4counterPage } from '../ex4counter/ex4counter';
import { Ex5counterPage } from '../ex5counter/ex5counter';
import { Ex6counterPage } from '../ex6counter/ex6counter';



/**
 * Generated class for the CountNumber_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-count-number-1',
  templateUrl: 'count-number-1.html',
})
export class CountNumber_1Page {



  constructor(public nav: NavController, 

    ) {

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountNumber_1Page');
  }

  chooseExer1() {
    this.nav.push(Ex1counterPage);
  }

  chooseExer2() {
    this.nav.push(Ex2counterPage);
  }

  chooseExer3() {
    this.nav.push(Ex3counterPage);
  }

  chooseExer4() {
    this.nav.push(Ex4counterPage);
  }

  chooseExer5() {
    this.nav.push(Ex5counterPage);
  }

  chooseExer6() {
    this.nav.push(Ex6counterPage);
  }



  

/* getanswer(i,j){
  i=this.index;
  console.log("selected Element Name=test"+j);
  this.http.get(this.url)
  .map((res:Response)=>res)
  .subscribe(data=>{ 

   let ans =this.getObjectWithoutKnowingKey(data);
   this.answer = ans[i].Answer;
   
var  selectanswer=ans[i].Choice[j-1];

   if(selectanswer == this.answer){
    console.log('answer is true')
      this.score = this.score+1;
     // console.log(this.score);
      this.index = this.index+1;
    //  this.clearTime();
      this.getdata(i+1);
     
      if(i==2){
        this.start=0;
       // this.stop=true;
        this.button();
        console.log("compelte");
      }else{
        console.log("not complete");
      }

      }else{
        console.log('answer is false')
        this.index = this.index+1;
        //this.clearTime();
        this.getdata(i+1);

        if(i==2){
          this.start=0;
          this.stop=true;
          this.button();
          console.log("compelte");
        }else{
          console.log("not complete");
        }
      }

       
      });
    
 }

 button(){
        
  let Score = this.Alert.create({
    title: 'คะแนน',
    message: 'คะแนนของนักเรียน คือ '+ this.score,
    buttons: [
      {
        text: 'OK',
        handler: data => {
         // this.sendPostRequest(this.score) ;
          this.nav.setRoot(ExercisePage)
       
        }
      }
    ]
  });
  Score.present();
}*/



}
