import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, Button } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import {MassagePage} from '../massage/massage';
import firebase from 'firebase';
declare var require:any;

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  myDate = new Date();
  reciever:string;
  comment:string;
  displayName;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private Alert:AlertController,
     public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  send(){   
  this.button()
  }

  button(){
        
    let Score = this.Alert.create({
      title: 'ความคิดเห็น',
      message: 'ส่งข้อความเรียบร้อย',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.sendPostRequest() ;
            this.navCtrl.push(MassagePage);
          }
        }
      ]
    });
    Score.present();
 }

  
  sendPostRequest() {
    ////current user
    firebase.auth().onAuthStateChanged((user)=>{
      this.displayName = user.displayName;

    /////time
    var dateFormat = require('dateformat');
    var  now = new Date();
    var date= dateFormat(now, 'shortDate');
    var time= dateFormat(now, "h:MM TT");

    /////

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    //const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            "sender" : this.displayName,
            "reciver"  : this.reciever,      
            "comment": this.comment,
            "time"    : time,
            "Date"    : date
           
    }

    this.http.post("https://us-central1-mathapp-128.cloudfunctions.net/app/post/comment", postData)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });

    });
  }



  

}
