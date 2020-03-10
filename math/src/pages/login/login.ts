import {Component} from "@angular/core";
import {NavController,NavParams, AlertController, ToastController, MenuController} from "ionic-angular";
import { HttpClient } from '@angular/common/http';

import {RegisterPage} from "../register/register";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPatrentPage } from "../login-patrent/login-patrent";
import { DailyPage } from "../daily/daily";
import firebase from 'firebase';

//import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

 email : string="";
 password : string="";
 status;
 Url = 'https://us-central1-mathapp-128.cloudfunctions.net/app/get/user';
 
    
  constructor(public navParams: NavParams,
    public nav: NavController, 
    public Alert: AlertController, 
    public menu: MenuController,
     public toastCtrl: ToastController,
     public http: HttpClient) 
     {
    this.menu.swipeEnable(false);

    var user = firebase.auth().onAuthStateChanged;
    if(user){
        console.log(user)
    }else{
        console.log("no user")
    }
    
    }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  //getdata
  getObjectWithoutKnowingKey(data){
    let objects=[];
    for(var propName in data){
      if(data.hasOwnProperty(propName)){
      objects.push(data[propName]);}

    }
    return objects;
  }

  
 Login(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.password)
    .then((user)=>{
      console.log(user);

      this.http.get(this.Url)
      .subscribe(data=>{ 
       let student =this.getObjectWithoutKnowingKey(data);
       for( var i = 0 ; i < student.length ; i++ ){
        if(this.email==student[i].email && this.password == student[i].password){
          if(student[i].status =="student"){
             this.nav.setRoot(DailyPage);
          }else {
            this.toastCtrl.create({
              message:"ไม่สามารถเข้าสู่ระบบ เนื่องจากอีเมลล์หรือรหัสผ่านไม่ถูกต้อง",
              duration:3000
            }).present();
          }
        }

       }
       
      });
      
    }).catch((err)=>{
      console.log(err)
      this.toastCtrl.create({
        message:err.message,
        duration:3000
      }).present();
    })
  

  }

  parent(){
    this.nav.setRoot(LoginPatrentPage);
  }


  forgotPass() {
    let forgot = this.Alert.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  

}
