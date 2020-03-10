import { Component} from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
declare var require:any;
//page
import {ExercisePage} from "../exercise/exercise"
import 'rxjs/add/observable/interval';

/**
 * Generated class for the Divideex3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-divideex3',
  templateUrl: 'divideex3.html',
})
export class Divideex3Page {
  result = '';
  ex2Url='https://us-central1-mathapp-128.cloudfunctions.net/app/get/exercise/divide/input/level3';
  ex2;
  Answer;
  index=0;
  score=0;
  displayName:string;
  id;

  ////time
  timerVal;
  start = 15;
  timerVar;
  stop=false;
 

  constructor(public navCtrl: NavController,   
    public http: HttpClient
    , public navParams: NavParams,
    private DB : AngularFireDatabase,
    private Alert:AlertController) {
      this.getdata(this.index);

  }

  getObjectWithoutKnowingKey(data){
    let objects=[];
    for(var propName in data){
      if(data.hasOwnProperty(propName)){
      objects.push(data[propName]);}

    }
    return objects;
  }

  getdata(i){
    i=this.index;
      this.http.get(this.ex2Url)
      .subscribe((data:any[])=>{
          let ex =this.getObjectWithoutKnowingKey(data);
          this.ex2=ex[i];
          this.ex2 = Array.of(this.ex2);
          console.log(ex[i]);
          console.log("start Timer");
          this.start=15;
          clearInterval(this.timerVal);
          this.StartTimer();


      });
      
  
   }

  
  btnclick(btn) {
    if (btn == 'c') {
        this.result = '';
    }else {
        this.result += btn;
    }

  }

  getanswer(i){
    i=this.index;
    
   // var checkanswer =  this.Answer= document.getElementById('textinput').innerText;//get value from button
    this.http.get(this.ex2Url)
      .map((res:Response)=>res)
      .subscribe(data=>{ 
       let ans =this.getObjectWithoutKnowingKey(data);
       this.Answer = ans[i].Answer;
       console.log(ans[i].Answer);

       if(this.result == this.Answer){
        this.score = this.score+1;
       // console.log(this.score);
        this.index = this.index+1;
        this.getdata(i+1);
        this.result="";
        
        if(i==2){
          this.start=0;
            this.stop=true;
          this.button();
          console.log("compelte");
        }else{
          console.log("not complete");
        }

        }else{
          console.log('answer is false')
          this.index = this.index+1;
          this.getdata(i+1);
          this.result="";

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

   sendPostRequest(i) {
    ////current user
    firebase.auth().onAuthStateChanged((user)=>{
     this.displayName = user.displayName;
     this.id = user.uid;
   ////time
   var dateFormat = require('dateformat');
   var  now = new Date();
   var date= dateFormat(now, 'shortDate');
   var time= dateFormat(now, "h:MM TT");
   console.log(date);
   console.log(time);

   ////
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Content-Type', 'application/json' );
   //const requestOptions = new RequestOptions({ headers: headers });

   let postData = {
           "user"  : this.displayName,
           "uid" : this.id,      
           "score": i,
           "exercise" : "divide3",
           "time"    : time,
           "Date"    : date
         
           
   }


   this.http.post("https://us-central1-mathapp-128.cloudfunctions.net/app/post/score/level1/divide", postData )
     .subscribe(data => {
       //console.log(data['_body']);
      }, error => {
       console.log(error);
     });

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
          this.sendPostRequest(this.score) ;
          this.navCtrl.setRoot(ExercisePage)
        }
      }
    ]
  });
  Score.present();
}


  StartTimer(){
  
    this.timerVar = setInterval(()=>{
   if(this.stop==true)
   {
     this.start=0;
   }
      if(this.start>0){
       // tmpTime--;
        this.start--;
           }
     if((this.start==0) && (this.stop==false)){
       this.stop=true;
       this.buttonTime();
        clearInterval(this.timerVar);
    
      }

    },1000)

  }


  buttonTime(){

    let Score = this.Alert.create({
      title: 'หมดเวลา',
      message: 'คะแนนของนักเรียน คือ '+ this.score,
      buttons: [
        {
          text: 'OK',
          handler: data => {    
           this.navCtrl.setRoot(ExercisePage);
           this.sendPostRequest(this.score);

         
          }
        }
      ]
    });
    Score.present();
 }
}
