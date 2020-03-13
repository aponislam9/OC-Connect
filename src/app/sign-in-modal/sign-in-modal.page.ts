import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { DisplayUserService } from "../services/display-user.service";

@Component({
  selector: "app-sign-in-modal",
  templateUrl: "./sign-in-modal.page.html",
  styleUrls: ["./sign-in-modal.page.scss"]
})
export class SignInModalPage implements OnInit {
  enteredemail;
  enteredpword;
  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private displayuser: DisplayUserService
  ) {}

  public userTest = {
    name: "John Anteater",
    picture: "assets/img/testPic.png",
    email: "Janteater@gmail.com",
    password: "John123",
    iGuest: "false"
  };

  closeModal() {
    this.modalController.dismiss();
  }

  updateSignInDB() {
    this.storage.get("all_users").then(users => {
      if (users != null) {
        console.log("not null");
        if (users.length > 0) {
          console.log("bigger 0");
          for (let u of users) {
            if (
              u.email == this.enteredemail &&
              u.password == this.enteredpword
            ) {
              console.log("adding");
              this.storage.set("signed_in_user", {
                name: u.name,
                picture: u.picture,
                email: u.email,
                password: u.password,
                iGuest: u.iGuest
              });
              this.storage.get("signed_in_user").then(val => {
                console.log(val);
              });
              this.modalController.dismiss();
              this.displayuser.loadUser();
              // this.displayuser.printUser();
            } else {
              console.log("not adding");
              this.tryAgain();
              this.enteredemail = "";
              this.enteredpword = "";
            }
          }
        }
      }
      //else {
      //   this.displayuser.loadUser();
      // }
    });
  }
  async tryAgain() {
    const alert = await this.alertCtrl.create({
      header: "Invalid",
      message: "Try a valid email and/or password",
      buttons: ["Okay"]
    });
    await alert.present();
  }

  // updateUserDB() {
  //   this.storage.get("all_users").then(user => {
  //     if (user != null) {
  //       console.log("users not null");
  //       if (user.length > 0) {
  //         console.log("there are users in db");
  //         for (let u of user) {
  //           if (u.email != this.enteredemail) {
  //             this.userTest.email = this.enteredemail;
  //             this.userTest.password = this.enteredpword;
  //             console.log(this.userTest);
  //           } else {
  //             console.log("user is already in db");
  //             console.log(this.enteredemail);
  //             console.log(u.email);
  //           }
  //         }
  //       }
  //     } else {
  //       console.log("users is null");
  //       this.storage.set("all_users", []);
  //     }
  //   });
  //   // this.userTest.email=this.enteredemail;
  //   // this.userTest.password=this.enteredpword;
  // }

  ngOnInit() {
    //this.updateSignInDB();
    //this.updateUserDB();
    // this.storage.clear();
    // let l = [];
    // l.push(this.userTest);
    // this.storage.set("all_users", l);
  }
}
