import { Component } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  company: string;
  date;
  startTime;
  endTime;
  address: string;
  description: string;

  submit() {
    console.log(this.company);
    console.log(this.date);
    console.log(this.startTime);
    console.log(this.endTime);
    console.log(this.address);
    console.log(this.description);
  }
}
