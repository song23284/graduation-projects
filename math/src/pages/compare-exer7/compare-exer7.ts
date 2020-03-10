import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController,App} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database';


import {ExercisePage} from "../exercise/exercise"
import {HomePage} from "../home/home";
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';

import 'rxjs/add/observable/interval';
declare var require:any;

@Component({
  selector: 'page-compare-exer7',
  templateUrl: 'compare-exer7.html',
})
export class CompareExer7Page {

  ex1;
  ex1Url = 'https://us-central1-mathapp-128.cloudfunctions.net/app/get/exercise/compare/multiplechoice/level7';
  //ex1Url= 'assets/data/Exercise1.json';
  //ex1u= 'assets/data/ex1.json'
  answer;
  ans:string;
  index=0;
  score = 0;
  N=1;
  exam;
  result;
  displayName:string;
  id;
  ////time
  timerVal;
  start = 15;
  timerVar;
  stop=false;
 
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private DB : AngularFireDatabase,
    public http: HttpClient,
    private Alert:AlertController,
    public toastCtrl: ToastController,
    private app: App) 
    {
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
         /* this.http.get(this.ex1u)
          .subscribe((data:any[])=>{
            this.ex1=data[i];
            this.ex1 = Array.of(this.ex1); ///when error [object]
            console.log(data[i]);
        });*/
        
        this.http.get(this.ex1Url)
          .subscribe((data:any[])=>{
            let ex =this.getObjectWithoutKnowingKey(data);
            this.ex1=ex[i];
            this.ex1 = Array.of(this.ex1);
            console.log(ex[i]);
            console.log("start Timer");
            this.start=15;
            clearInterval(this.timerVal);
            this.StartTimer();
        
        }); 
     }
     
     getanswer(i,j){
      i=this.index;
      console.log("selected Element Name=test"+j);
      this.http.get(this.ex1Url)
      .map((res:Response)=>res)
      .subscribe(data=>{ 

       let ans =this.getObjectWithoutKnowingKey(data);
       this.answer = ans[i].Question.Answer;
       console.log(this.answer)
       
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
            this.stop=true;
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
                  this.sendPostRequest(this.score) ;
                  this.navCtrl.setRoot(ExercisePage)
               
                }
              }
            ]
          });
          Score.present();
       }


     onSelect1(){
      this.getanswer(this.index,1);
    
           }

     onSelect2(){
   this.getanswer(this.index,2);
  
     }

     onSelect3(){
      this.getanswer(this.index,3);
    
     }


  ionViewDidLoad() {
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
            "exercise" : "compare7",
            "time"    : time,
            "Date"    : date
          
    }


    this.http.post("https://us-central1-mathapp-128.cloudfunctions.net/app/post/score/level1/compare", postData )
      .subscribe(data => {
        //console.log(data['body']);
       }, error => {
        console.log(error);
      });

    });
  }

  goToAccount(){
    this.navCtrl.push(HomePage);
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
