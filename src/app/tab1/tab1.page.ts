import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Md5} from 'ts-md5/dist/md5';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: Storage, private _md5: Md5, private alertCtrl: AlertController) {}

  company: string;
  title: string;
  banner;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;

  
  public event = {
    id: null,
    company: "",
    title: "",
    banner: "",
    date: null,
    startTime: null,
    endTime: null,
    location: "",
    description: "",
    affiliatedOrganization: "",
    hashtags: [], // string[]
    comments: [] // comment[]
  }

  submit() {
    this.gatherInfo();
    this.event.id = Md5.hashStr(this.event.title);
    console.log(this.event);
    this.storage.get("all_events").then(async(all_events) =>{
        //uncomment this line to add to storage
        // all_events.put(event);
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: 'Event was created successfully!',
          buttons: ['Okay']
        });
      await alert.present();
    });
  }

  gatherInfo() {
    this.event.title = this.title;
    this.event.company = this.company;
    this.event.date = moment(this.date).format('MMM Do YYYY');
    this.event.startTime = moment(this.startTime).format('LT');
    this.event.endTime = moment(this.endTime).format('LT');
    this.event.description = this.description;
    this.event.location = this.location;
  }
}
