import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
///page
import {ExercisePage} from "../exercise/exercise"

declare var require:any;
/**
 * Generated class for the Ex5subPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ex5sub',
  templateUrl: 'ex5sub.html',
})
export class Ex5subPage {

  ex3;
  ex3Url= 'https://us-central1-mathapp-128.cloudfunctions.net/app/get/exercise/subtraction/compare/level5';
  Answer;
  index=0;
  score = 0;
  displayName:string;
  id;

    ////time
    timerVal;
    start = 15;
    timerVar;
    stop=false;


    constructor(public navCtrl: NavController, public navParams: NavParams, 
      public http: HttpClient, private Alert:AlertController) {
this.getdata(this.index);
}

ionViewDidLoad() {
console.log('ionViewDidLoad Add1Exer3Page');
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
this.http.get(this.ex3Url)
.subscribe((data:any[])=>{
  let ex =this.getObjectWithoutKnowingKey(data);
  this.ex3=ex[i];
  this.ex3 = Array.of(this.ex3);
  console.log(this.ex3);
  console.log("start Timer");
    this.start=15;
    clearInterval(this.timerVal);
    this.StartTimer();

});


}


clicked(btn,i){
i=this.index;
this.http.get(this.ex3Url)
.map((res:Response)=>res)
.subscribe(data=>{ 

let ans =this.getObjectWithoutKnowingKey(data);
this.Answer = ans[i].Answer;
this.Answer = Array.of(this.Answer);
console.log(this.Answer);


if(btn =='False' && btn==this.Answer){
console.log('correct')
this.score = this.score+1;
this.index = this.index+1;
this.getdata(i+1);
if(i==2){
this.start=0;
this.stop=true;
this.button();
console.log("compelte");
}else{
console.log("not complete");
}
 
}else if(btn =='True' && btn==this.Answer){ 
console.log('correct')
this.score = this.score+1;
this.index = this.index+1;
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
console.log('incorrect')
this.index = this.index+1;
this.getdata(i+1);
if(i==2){
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
 "exercise" : "subtraction5",
 "time"    : time,
 "Date"    : date

}


this.http.post("https://us-central1-mathapp-128.cloudfunctions.net/app/post/score/level1/minus", postData )
.subscribe(data => {
// console.log(data['_body']);
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
