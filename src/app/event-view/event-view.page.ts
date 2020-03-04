import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.page.html',
  styleUrls: ['./event-view.page.scss'],
})
export class EventViewPage implements OnInit {

  constructor(private router: Router) {}

  handleCommentClick() {
    this.router.navigateByUrl('/comment-view');
  }


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


  user01 = {
    name: "Michael Johnson",
    picture: "assets/img/stock_1.jpg",
    commentTime: "Feb, 23 at 8:34 AM",
    commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  }
  user02 = {
    name: "Jordan Stevens",
    picture: "assets/img/stock_2.jpg",
    commentTime: "Feb, 23 at 8:35 AM",
    commentText: "Elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit, sed do eiusmod tempor",
  }
  
  user03 = {
    name: "Kyle McKenen",
    picture: "assets/img/stock_3.jpg",
    commentTime: "Feb, 23 at 8:37 AM",
    commentText: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  }

  userSubComments = [this.user01, this.user02, this.user03]

  user1 = {
    name: "Michael Johnson",
    picture: "assets/img/stock_1.jpg",
    commentTime: "Feb, 23 at 8:34 AM",
    commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    sub_comments: this.userSubComments,
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


  ngOnInit() {
  }

}
