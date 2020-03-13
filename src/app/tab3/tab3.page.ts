import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { MenuPopoverComponent } from "../menu-popover/menu-popover.component";

import { Storage } from "@ionic/storage";
import { DisplayUserService } from "../services/display-user.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  constructor(
    public popoverController: PopoverController,
    private storage: Storage,
    private displayUser: DisplayUserService
  ) {}
  ngOnInit() {
    this.displayUser.loadUser();
    // this.storage.clear();
    // this.loadUser();
  }
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event
    });
    return await popover.present();
  }

  public btnStatus = this.displayUser.btn;

  public U = this.displayUser.User;

  logOutUser() {
    this.displayUser.takeOutUser();
    this.U = this.displayUser.User;
    this.btnStatus = this.displayUser.btn;
    // this.storage.set("signed_in_user", null);
    // this.displayUser.loadUser();
    // console.log("is user logged off in storage tab3")
    // console.log(this.displayUser.User.name);
    // this.U = this.displayUser.User;
  }

  // loadUser() {
  //   this.storage.get("signed_in_user").then(user => {
  //     if (user == null) {
  //       this.User.name = this.defaultUser.name;
  //       this.User.picture = this.defaultUser.picture;
  //       this.User.email = this.defaultUser.email;
  //       this.User.password = this.defaultUser.password;
  //       this.User.isGuest = this.defaultUser.isGuest;
  //     } else {
  //       this.User.name = user.name;
  //       this.User.picture = user.picture;
  //       this.User.email = user.email;
  //       this.User.password = user.password;
  //       this.User.isGuest = user.iGuest;
  //       console.log("skhfshdjfivhfhd");
  //       console.log(this.User);
  //     }
  //   });
  // }

  /*
  public loadUser()
  {
    this.storage.get('all_users').then((all_users) => {
      console.log("ALL_USERS: ");
      console.log(all_users);

    if(all_users != null){
      if(all_users.length > 0){
        for(let user of all_users){
          console.log(user.email);
          console.log(this.user.email);

          if(user.email == this.userEmail){
            this.transferUserInfo(user);
          }
        }
      }
      else{
        console.log("all_users is not null but its empty")
        all_users.push(this.userTest);
        this.storage.set("all_users", all_users);

      }
    }
    else{
      console.log("all_users is null");
      this.storage.set("all_users", []);
    }});
  }

  public transferUserInfo(user){
    this.user.name=user.name;
    this.user.picture=user.picture;
    this.user.email=user.email;
    this.user.password=user.password;
    this.user.isGuest=user.isGuest;
  }
 */
}
