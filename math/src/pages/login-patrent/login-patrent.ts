import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {MenuPage} from '../menu/menu'
import { RegisterparentPage } from '../registerparent/registerparent';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-login-patrent',
  templateUrl: 'login-patrent.html',
})
export class LoginPatrentPage {
  email : string="";
 password : string="";
 Url = 'assets/data/user.json';
 

  constructor(public nav: NavController, public navParams: NavParams,
              public forgotCtrl: AlertController, 
              public toastCtrl: ToastController,
              public http: HttpClient
    ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPatrentPage');
  }

  switchstu(){
    this.nav.push(LoginPage);
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
      
      this.http.get(this.Url)
      .subscribe(data=>{ 
       let student =this.getObjectWithoutKnowingKey(data);
       for( var i = 0 ; i < student.length ; i++ ){

        if(this.email==student[i].email && this.password == student[i].password){
          if(student[i].status =="parent"){
            this.nav.setRoot(MenuPage);
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

  forgotPass() {
    let forgot = this.forgotCtrl.create({
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

  register(){
    this.nav.push(RegisterparentPage);
  }

}
