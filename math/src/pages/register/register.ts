import {Component} from "@angular/core";
import {NavController,NavParams,ToastController,AlertController} from "ionic-angular";
import {LoginPage} from "../login/login";
//import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { EmailValidator } from "@angular/forms";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  //providers: [AngularFireAuth]
})
export class RegisterPage {
  name: string = "";
  email: string = "";
  password: string = "";
  status:string="student";
  uid;

   ionViewDidLoad(){
    
  }
  public userProfileRef:firebase.database.Reference;
  
  constructor(public nav: NavController,
    public navParams: NavParams,
    public Alert: AlertController, 
     public toastCtrl: ToastController) {
  }

  // register and go to Login page
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
                  this.nav.setRoot(LoginPage);
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


  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
