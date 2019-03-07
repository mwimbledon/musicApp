import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string = "";
  password: string = "";
  cPassword: string = "";

  constructor(
              public afAuth: AngularFireAuth,
              public alert: AlertController,
              public router: Router
            ) { }

  ngOnInit() {
  }

  async signUp() {
    const { email, password, cPassword } = this;
    if(password !== cPassword) {
      this.showAlert("Error", "Passwords did not match.");
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      this.showAlert("Success", "Welcome aboard.");
      this.router.navigate(['/login']);
    } catch(err) {
      console.dir(err);
      this.showAlert("Error", err.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    });

    await alert.present();
  }

}
