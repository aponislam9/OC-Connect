import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class DisplayUserService {
  constructor(private storage: Storage) {}
  // ngOnInit() {
  //   this.storage.clear();
  // }

  public btn = "Log In";

  public defaultUser = {
    name: "Name",
    picture: "assets/icon/person.png",
    email: "",
    password: "",
    isGuest: ""
  };
  public User = {
    name: "",
    picture: "",
    email: "",
    password: "",
    isGuest: ""
  };
  loadUser() {
    this.storage.get("signed_in_user").then(user => {
      if (user == null) {
        console.log("user not signed in");
        console.log("user loged off here");
        this.User.name = this.defaultUser.name;
        this.User.picture = this.defaultUser.picture;
        this.User.email = this.defaultUser.email;
        this.User.password = this.defaultUser.password;
        this.User.isGuest = this.defaultUser.isGuest;
      } else {
        this.btn = "Log Out";
        console.log("user signed in");
        console.log("user didnt log off here");
        this.User.name = user.name;
        this.User.picture = user.picture;
        this.User.email = user.email;
        this.User.password = user.password;
        this.User.isGuest = user.iGuest;
      }
    });
  }
  printUser() {
    console.log("printing user values");
    console.log(this.User.name);
    console.log(this.User.picture);
    console.log(this.User.email);
    console.log(this.User.password);
    console.log(this.User.isGuest);
  }

  takeOutUser() {
    // console.log("before logging off");
    // this.storage.get("signed_in_user").then(val => {
    //   console.log(val);
    // });
    this.storage.set("signed_in_user", null);
    // console.log("after logging off");
    // this.storage.get("signed_in_user").then(val => {
    //   console.log(val);
    // });
    this.User = this.defaultUser;
    this.btn = "Log In";
    console.log("after logging off");
    this.storage.get("signed_in_user").then(val => {
      console.log(val);
    });
  }
}
