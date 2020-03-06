import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.page.html',
  styleUrls: ['./comment-view.page.scss'],
})
export class CommentViewPage implements OnInit {

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


  user_comment = {
    name: "Michael Johnson",
    picture: "assets/img/stock_1.jpg",
    commentTime: "Feb, 23 at 8:34 AM",
    commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    subComments: this.userSubComments,
    subCommentCount: 3
  }

  constructor() { }

  ngOnInit() {
  }

}
