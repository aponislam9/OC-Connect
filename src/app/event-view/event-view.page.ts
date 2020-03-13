import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

import { SignInModalPage } from "../sign-in-modal/sign-in-modal.page";
import { ModalController, LoadingController } from "@ionic/angular";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: "app-event-view",
  templateUrl: "./event-view.page.html",
  styleUrls: ["./event-view.page.scss"]
})
export class EventViewPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private modalController: ModalController,
    public loadingController: LoadingController
  ) {}

  public enteredComment = ""; // This changes when the user types into the comment's text-field

  // This local event is used to render this event-view
  // When a change is made to the local event, the database is updated to reflect the change
  public event = {
    id: "",
    title: "",
    banner: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  };

  // Will be removed once the app has a way of representing a "Logged in User"
  public user_info = {
    name: "",
    picture: "",
    exist: false
  };

  // This local comment is used to add comments to the event. When the user
  // makes a comment, this local object is populated with data. Then it is
  // copied over into the local event object, then the database is updated
  // to reflet the new comment
  public comment = {
    id: "",
    user_info: {
      name: "",
      picture: ""
    },
    text: "",
    commentTime: "",
    subComments: [] // comment[]
  };

  ngOnInit() {
    // Use this to wipe the DB
    // this.storage.clear();
    // console.log("DB CLEARED");
    this.getSignedInUser();

    // We get this ID from Tab2. See routing changes to see how this is done
    console.log("EVENT ID FROM THE SNAPSHOT");
    console.log(this.route.snapshot.paramMap.get("event-id"));
    this.event.id = this.route.snapshot.paramMap.get("event-id").replace(":", ""); // part is hacky but is needed
    this.loadEvent();
    console.log("LOADED EVENT --> ");
    console.log(this.event);
  }

  getSignedInUser() {
    console.log("TEST getSignedInUser");
    this.storage.get("signed_in_user").then(signed_in_user => {
      console.log("TEST start");
      console.log("signed_in_user: ", signed_in_user);
      if (signed_in_user != null) {
        console.log("TEST != null");
        this.user_info.name = signed_in_user.name;
        this.user_info.picture = signed_in_user.picture;
        this.user_info.exist = true;
      }
    });
  }

  // This function is used to load an event from the Database using the event ID given to us via routing
  public loadEvent() {
    this.storage.get("all_events").then(all_events => {
      console.log("ALL_EVENTS: ", all_events);

      if (all_events != null) {

        if (all_events.length > 0) {
          console.log("NOT NULL - CONTAINS ELEMENT");
          for (let event of all_events) {
            console.log("TESTING ID")
            console.log(event.id);
            console.log(this.event.id);

            if (event.id == this.event.id) {
              this.transfer_event_details(event);
              console.log("LOADED EVENT", this.event);
            }
          }
        }
      }
    });
  }

  // This functon transfers the event details from the event we found in the DB to our local event
  // Idk if I have to actually do this, but it seems to be the only way to do it atm
  public transfer_event_details(event) {
    this.event.id = event.id;
    this.event.title = event.title;
    this.event.banner = event.banner;
    this.event.date = event.date;
    this.event.startTime = event.startTime;
    this.event.endTime = event.endTime;
    this.event.location = event.location;
    this.event.affiliatedOrganization = event.affiliatedOrganization;
    this.event.hashtags = event.hashtags;
    this.event.comments = event.comments;
  }

  // This is called every time someone clicks the "Submit" button on for a new comment
  public handleSubmitClick() {
    if (this.user_info.exist) {
      if (this.enteredComment != "") {
        this.createComment();
        this.addCommentToEvent();
        this.lookForHashtags();
        this.updateEventInDB();
        this.clearComment();
        this.print_database();
      }
    } else {
      this.openModal();
      this.getSignedInUser();
    }
  }

  // Use the information Provided to us to propulate the local comment with data
  public createComment() {
    this.comment.id = "COMMENT_ID_TEST"; // TODO: Add an actual ID
    this.comment.user_info.name = this.user_info.name; // this will have to change once a user profile is implemented
    this.comment.user_info.picture = this.user_info.picture; // this will have to change once a user profile is implemented
    this.comment.text = this.enteredComment; // Grabbed from the comment's text-field
    this.comment.commentTime = new Date().toLocaleString();
  }

  // This function adds the new comment to the event. Seems repetative, but for some reason
  // its the only way that works..
  public addCommentToEvent() {
    this.event.comments.push({
      id: this.comment.id,
      user_info: {
        name: this.comment.user_info.name,
        picture: this.comment.user_info.picture
      },
      text: this.comment.text,
      commentTime: this.comment.commentTime
    });
  }

  // Use a regular expression to search for hashtags in the user's comment.
  // Update the event's list of hashtags once found
  public lookForHashtags() {
    let regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    let hashtag;

    while ((hashtag = regex.exec(this.comment.text))) {
      if (!this.event.hashtags.includes(hashtag[0])) {
        this.event.hashtags.push(hashtag[0]);
      }
    }
  }

  // Reset the local comment object so that a new comment can populate it later
  public clearComment() {
    // Clear the local comment variable
    this.comment.id = "";
    this.comment.user_info.name = "";
    this.comment.user_info.picture = "";
    this.comment.text = "";
    this.comment.commentTime = "";
    this.comment.subComments = [];

    // Clear the text that the user typed into the text-area
    this.enteredComment = "";
  }

  // Update the event we are looking at in the DB. Grabs the array for all_events,
  // updates the array, then replace the array the DB has with the updated one
  public updateEventInDB() {
    this.storage.get("all_events").then(all_events => {
      if (all_events != null) {
        if (all_events.length > 0) {
          console.log("UPDATING COMMENT - ALL_EVENTS CONTAINS ELEMENTS");
          for (let event_id in all_events) {
            if (all_events[event_id].id == this.event.id) {
              all_events[event_id] = this.event;
            }
          }
          this.storage.set("all_events", all_events);
        } else {
          console.log("UPDATING COMMENT - ALL_EVENTS CONTAINS NO ELEMENTS");
        }
      } else {
        console.log("UPDATING COMMENT - ALL_EVENTS == NULL");
      }
    });
  }

  // print all events from the DB
  public print_database() {
    this.storage.get("all_events").then(all_events => {
      if (all_events != null) {
        if (all_events.length > 0) {
          console.log("UPDATING COMMENT - NOT NULL - CONTAINS ELEMENT");
          console.log("PRINTING DATABASE....");
          for (let event of all_events) {
            console.log(event);
          }
        } else {
          console.log("UPDATING COMMENT - NOT NULL - CONTAINS NO ELEMENTS");
        }
      } else {
        console.log("UPDATING COMMENT - ALL EVENT == NULL");
      }
    });
  }

  handleCommentClick() {
    if (this.user_info.exist) {
      this.router.navigateByUrl("/comment-view");
    } else {
      this.openModal();
      this.getSignedInUser();
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SignInModalPage
      // componentProps: {
      //   custom_id: this.value
      // }
    });
    modal.present();
  }
}

  // Datebase structure

  // this.storage = {
  //   "all_users": [], // user[]
  //   "all_events": [] // event[]
  //   "signed_in_user": {user...}
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
  //   id: null,
  //   company: "",
  //   title: "",
  //   banner: "",
  //   date: null,
  //   startTime: null,
  //   endTime: null,
  //   location: "",
  //   description: "",
  //   affiliatedOrganization: "",
  //   hashtags: [], // string[]
  //   comments: [] // comment[]
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