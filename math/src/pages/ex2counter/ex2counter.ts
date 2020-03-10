import { Component } from '@angular/core';
import { NavController, NavParams ,PopoverController, AlertController, ToastController} from 'ionic-angular';
import 'rxjs/add/observable/interval';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import 'rxjs/add/observable/interval';
import {ExercisePage} from "../exercise/exercise"

declare var require:any;



@Component({
  selector: 'page-ex2counter',
  templateUrl: 'ex2counter.html',
})
export class Ex2counterPage {
  url='https://us-central1-mathapp-128.cloudfunctions.net/app/get/exercise/couter/multiplechoice/level1';
  ex1;
  answer;
  index=0
  DisplayName;
  score=0;
  img;
  displayName;
  id;

  /////time
  timerVal;
  start = 15;
  timerVar;
  stop=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public http: HttpClient,
    private Alert:AlertController,
    public toastCtrl: ToastController) {
      this.getdata(this.index);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ex2counterPage');
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
    this.http.get(this.url)
      .subscribe((data:any[])=>{
        let ex =this.getObjectWithoutKnowingKey(data);
        this.ex1=ex[i];
        this.img=ex[i].PicureUrl;
        this.ex1 = Array.of(this.ex1);
        console.log(this.ex1);
        console.log(this.img);
        console.log("start Timer");
        this.start=15;
        clearInterval(this.timerVal);
       this.StartTimer();
    
    }); 

}

getanswer(i,j){
  i=this.index;
  console.log("selected Element Name=test"+j);
  this.http.get(this.url)
  .map((res:Response)=>res)
  .subscribe(data=>{ 

   let ans =this.getObjectWithoutKnowingKey(data);
   this.answer = ans[i].answer;
   
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

onSelect4(){
this.getanswer(this.index,4);
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
    "exercise" : "counter2",
    "time"    : time,
    "Date"    : date
  
}


this.http.post("https://us-central1-mathapp-128.cloudfunctions.net/app/post/score/level1/addition", postData )
.subscribe(data => {
//console.log(data['body']);
}, error => {
console.log(error);
});

});
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
