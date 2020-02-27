import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventViewPageRoutingModule } from './event-view-routing.module';

import { EventViewPage } from './event-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventViewPageRoutingModule
  ],
  declarations: [EventViewPage]
})
export class EventViewPageModule {
  eventDetails = {
    title: "1 Million Cups: Wing Pitch",
    time: "8:00AM - 9:30AM",
    date: "Feb 26",
    location: "5141 California Ave #250, Irvine, CA 92617"
  }

  hashtags = ["#tech", "#marketing", "#pitch", "#finance", "#general", "#numbers", "#test"]

  // sliderConfig = {
  //   centeredSlides: false,
  //   slidesPerView: 3
  // }

  user1 = {
    name: "Michael Johnson",
    picture: "assets/img/stock_1.jpg",
    commentTime: "Feb, 23 at 8:34 AM",
    commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    sub_comments: ["Lorem ipsum dolor sit amet, consectetur",
                   "eiusmod tempor incididunt ut labore",
                   "et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"],
    subCommentCount: 3
  }
  user2 = {
    name: "Jordan Stevens",
    picture: "assets/img/stock_2.jpg",
    commentTime: "Feb, 23 at 8:35 AM",
    commentText: "Elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor",
    sub_comments: [],
    subCommentCount: 0
  }
  
  user3 = {
    name: "Kyle McKenen",
    picture: "assets/img/stock_3.jpg",
    commentTime: "Feb, 23 at 8:37 AM",
    commentText: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    sub_comments: [],
    subCommentCount: 0  
  }

  userComments = [this.user1, this.user2, this.user3]


  constructor() {}

}
