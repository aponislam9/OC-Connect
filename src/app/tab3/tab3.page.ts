import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { MenuPopoverComponent } from "../menu-popover/menu-popover.component";

import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  constructor(
    public popoverController: PopoverController,
    private storage: Storage
  ) {}

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event
    });
    return await popover.present();
  }

  private userEmail: string;

  public user = {
    name: "Name",
    picture: "assets/icon/person.png",
    email: "",
    password: "",
    isGuest: ""
  };

  public userTest = {
    name: "John Anteater",
    picture: "assets/img/testPic.png",
    email: "JohnA@gmail.com",
    password: "John123!",
    iGuest: "false"
  };

  logOutUser() {
    this.userTest.name = "Name";
    this.userTest.picture = this.user.picture;
    this.userTest.email = this.user.email;
    this.userTest.password = this.user.password;
    this.userTest.iGuest = this.user.isGuest;
  }
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
