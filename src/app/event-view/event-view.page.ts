import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { SignInModalPage } from '../sign-in-modal/sign-in-modal.page';
import { ModalController, LoadingController } from '@ionic/angular';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.page.html',
  styleUrls: ['./event-view.page.scss'],
})

export class EventViewPage implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storage: Storage,
              private modalController: ModalController,
              public loadingController: LoadingController) {}

  private eventID: string; // Right now the ID is just the name of the event

  public event = {
    id: "",
    title: "",
    banner: "",
    date: "",
    time: "",
    location: "",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  public TEST_EVENT = {
    id: ":EVENT_ID_TEST",
    title: "One Million Cups Presents: Dunder Mifflin",
    banner: "assets/img/Dunder_Mifflin.png",
    date: "Friday Jan 31",
    time: "8:00AM",
    location: "5141 California Ave #250, Irvine CA 92617",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  ngOnInit() {
    // We get this ID from Tab2. See routing changes to see how this is done
    this.eventID = this.route.snapshot.paramMap.get("event-id");
    console.log("EVENT ID FROM THE SNAPSHOT");
    console.log(this.route.snapshot.paramMap.get("event-id"));
    this.event.id = this.eventID;
    console.log("EVENT ID --> " + this.eventID);
    this.loadEvent();

    console.log("LOADED EVENT --> ");
    console.log(this.event);

  }

  public loadEvent() {
    // USE THIS TO RESET THE DATABASE
 

    this.storage.get('all_events').then((all_events) => {
      console.log("ALL_EVENTS: ");
      console.log(all_events);

      if (all_events != null) {
        if (all_events.length > 0) {
          console.log("NOT NULL - CONTAINS ELEMENT");
          for (let event of all_events) {
            console.log(event.id);
            console.log(this.eventID);
  
            if (event.id == this.eventID) {
              console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")
              this.transfer_event_details(event);
              console.log("PROMISE LOADED EVENT --> ");
              console.log(this.event);
            }
          }
        } else {
          console.log("NOT NULL - CONTAINS NO ELEMENTS");
          all_events.push(this.TEST_EVENT);
          this.storage.set('all_events', all_events)
        }


      } else {
        console.log("ALL EVENT == NULL");
        this.storage.set('all_events', [])
      }
    });
  }

  // Idk if I have to actually do this, but it seems to be the only way to do it atm
  public transfer_event_details(event) {
    this.event.id = event.id;
    this.event.title = event.title;
    this.event.banner = event.banner;
    this.event.date = event.date;
    this.event.time = event.time;
    this.event.location = event.location;
    this.event.affiliatedOrganization = event.affiliatedOrganization;
    this.event.hashtags = event.hashtags;
    this.event.comments = event.comments;
  }




















  // Datebase structure

  // this.storage = {
  //   "all_users": [], // user[]
  //   "all_events": [] // event[]
  // }


  // JSON structure    

  // user: {
  //   name: "",
  //   picture: "",
  //   email: "",
  //   password: "",
  //   isGuest: ""
  // }

  // event: {
  //   baner: "",
  //   title: "",
  //   date: "",
  //   time: "",
  //   location: "",
  //   affiliatedOrganization: "",
  //   hashtags: [],
  //   commments: [] // comment[]
  // }

  // comment: {
  //   user_info: {
  //     name: "",
  //     picture: ""
  //   },
  //   text: "",
  //   commentTime: "",
  //   subComments: [] // comment[]
  // }

  handleCommentClick() {
    this.router.navigateByUrl('/comment-view');

    // if (this.signed_in) {
    //   this.router.navigateByUrl('/comment-view');

    // } else {
    //   this.openModal()
    // }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SignInModalPage,
      // componentProps: {
      //   custom_id: this.value
      // }
    });
    modal.present();
  }

  // eventDetails = {
  //   title: "1 Million Cups: Wing Pitch",
  //   time: "8:00AM - 9:30AM",
  //   date: "Feb 26",
  //   location: "5141 California Ave #250, Irvine, CA 92617"
  // }

  // hashtags = ["#tech", "#marketing", "#pitch", "#finance", "#general", "#numbers", "#test"]

  // sliderConfig = {
  //   centeredSlides: false,
  //   slidesPerView: 3
  // }


  // user01 = {
  //   name: "Michael Johnson",
  //   picture: "assets/img/stock_1.jpg",
  //   commentTime: "Feb, 23 at 8:34 AM",
  //   commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  // }
  // user02 = {
  //   name: "Jordan Stevens",
  //   picture: "assets/img/stock_2.jpg",
  //   commentTime: "Feb, 23 at 8:35 AM",
  //   commentText: "Elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor",
  // }
  
  // user03 = {
  //   name: "Kyle McKenen",
  //   picture: "assets/img/stock_3.jpg",
  //   commentTime: "Feb, 23 at 8:37 AM",
  //   commentText: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  // }

  // userSubComments = [this.user01, this.user02, this.user03]

  // user1 = {
  //   name: "Michael Johnson",
  //   picture: "assets/img/stock_1.jpg",
  //   commentTime: "Feb, 23 at 8:34 AM",
  //   commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  //   sub_comments: this.userSubComments,
  //   subCommentCount: 3
  // }
  // user2 = {
  //   name: "Jordan Stevens",
  //   picture: "assets/img/stock_2.jpg",
  //   commentTime: "Feb, 23 at 8:35 AM",
  //   commentText: "Elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor",
  //   sub_comments: [],
  //   subCommentCount: 0
  // }
  
  // user3 = {
  //   name: "Kyle McKenen",
  //   picture: "assets/img/stock_3.jpg",
  //   commentTime: "Feb, 23 at 8:37 AM",
  //   commentText: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  //   sub_comments: [],
  //   subCommentCount: 0  
  // }

  // userComments = [this.user1, this.user2, this.user3]
}
