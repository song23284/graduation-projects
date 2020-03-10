import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {LoginPatrentPage} from "../login-patrent/login-patrent";
/**
 * Generated class for the RegisterparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registerparent',
  templateUrl: 'registerparent.html',
})
export class RegisterparentPage {

  name: string = "";
  email: string = "";
  password: string = "";
  status:string="parent";

  constructor(public nav: NavController, 
    public navParam: NavParams,
    public Alert: AlertController, 
     public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterparentPage');
  }

  register(user: any, path: string) : Promise<any> {
    return firebase.auth()
    .createUserWithEmailAndPassword(this.email,this.password)
    .then(
      (newUser)=>{

        firebase.database()
        .ref(`/user`) /////referance 
        .child(newUser.user.uid)
        .set({name:this.name,email:this.email,password:this.password,status:this.status})

       
        newUser.user.updateProfile({
          displayName: this.name,
          photoURL: ""

         
        }).then((res)=>{
          console.log("Profile update")

          this.Alert.create({
            title:"Acount create",
            message: "Your account has been create successfully",
            buttons:[
              {
                text:"ok",
                handler:()=>{
                  this.nav.setRoot(LoginPatrentPage);
                }
              }
            ]
          }).present();

        }).catch((err)=>{
          console.log(err)
        })

        console.log(newUser)

    }).catch((err)=>{
      console.log(err)
      this.toastCtrl.create({
        message:err.message,
        duration:3000
      }).present();
    });
  }

  login() {
    this.nav.setRoot(LoginPatrentPage);
  }


}
