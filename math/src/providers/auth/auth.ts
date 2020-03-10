import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import {Facebook} from '@ionic-native/facebook';
import {auth} from 'firebase';
import {Platform} from 'ionic-angular';
@Injectable()
export class AuthProvider {
constructor(private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform) {
  }
  /*loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(facebookCredential).then(user => {
            observer.next(user);
          }).catch(error => {
            observer.error(error);
          });
        }).catch((error) => {
          observer.error(error);
        });
      } else {
        this.afAuth.auth
          .signInWithPopup(new auth.FacebookAuthProvider())
          .then((res) => {
            observer.next(res);
          }).catch(error => {
          observer.error(error);
        });
      }
    });
  }*/
  logout() {
    this.afAuth.auth.signOut();
  }
}