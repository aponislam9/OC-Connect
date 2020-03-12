import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // When the page is initialized, load in dummy data
  ngOnInit() {
    // this.storage.clear();
    // console.log("DB CLEARED")
    this.initializeProtoypeData();
  }

  private selectedEvent = {
    eventName: "EVENT_ID_TEST"
  }

  constructor(private router: Router, private storage: Storage) {}
  
  handleCardClick() {
    this.router.navigateByUrl('/event-view/:' + this.selectedEvent.eventName);
  }

  // Database Structure for Prototype
  ////////////////////////////////////
  // this.storage = {
  //   "all_users": [], // an array of user JSON objects
  //   "all_events": [] // an array of event JSON objects
  //   "signed_in_user": {user...}
  // }
  ////////////////////////////////////

  // This function is used to populate the DB with data that will be used in our Prototype for Quater 1
  // The reason I am doing it on this page is because I forced this page to always be the first page to load
  initializeProtoypeData() {
    this.storage.get("all_users").then(all_users => {
      if (all_users == null) {
        this.storage.set("all_users", [
          {
            name: "John Anteater",
            picture: "assets/img/testPic.png",
            email: "Janteater@gmail.com",
            password: "John123",
            iGuest: "false"
          }
        ])
      }
    });

    this.storage.get("all_events").then(all_events => {
      if (all_events == null) {
        this.storage.set("all_events", [
          {
            id: "EVENT_ID_TEST",
            title: "One Million Cups Presents: Dunder Mifflin",
            banner: "assets/img/Dunder_Mifflin.png",
            date: "Friday Jan 31",
            startTime: "8:00 AM",
            endTime: "10:00 AM",
            location: "5141 California Ave #250, Irvine CA 92617",
            affiliatedOrganization: "",
            hashtags: [], // string[]
            comments: [] // comment[]
          }
        ])
      }
    });

    this.storage.get("signed_in_user").then(signed_in_user => {
      if (signed_in_user == null) { this.storage.set("signed_in_user", null) }
    });
  }
}
