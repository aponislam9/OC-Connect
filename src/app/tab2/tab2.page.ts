import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private selectedEvent = {
    eventName: "EVENT_ID_TEST"
  }


  private TEST_EVENT3 = {
    id: ":EVENT_ID_TEST",
    sponsor: "One Million Cups",
    speaker:"Dunder Mifflin",
    banner: "assets/img/Dunder_Mifflin.png",
    date: "Thursday Jan 30 2020",
    time: "8:00AM",
    location: "5141 California Ave #250, Irvine CA 92617",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  private TEST_EVENT1 = {
    id: ":EVENT_ID_TEST",
    sponsor: "One Million Cups",
    speaker:"Dunder Mifflin",
    banner: "assets/img/Dunder_Mifflin.png",
    date: "Friday Jan 31 2020",
    time: "8:00AM",
    location: "5141 California Ave #250, Irvine CA 92617",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  private TEST_EVENT2 = {
    id: ":EVENT_ID_TEST2",
    sponsor: "One Million Cups",
    speaker:"Opportunity Campus",
    banner: "assets/img/Another Company.png",
    date: "Friday Jan 31 2020",
    time: "10:00AM",
    location: "5722 Laurel Cyn Blvd, North Hollywood CA 92422",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  private ALL_EVENT = [this.TEST_EVENT1, this.TEST_EVENT2]

  

  constructor(private router: Router, private storage: Storage) {  
  }
  

  handleCardClick() {
    this.router.navigateByUrl('/event-view/:' + this.selectedEvent.eventName);
  }
}
