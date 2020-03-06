import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.page.html',
  styleUrls: ['./sign-in-modal.page.scss'],
})
export class SignInModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }


  ngOnInit() {
  }

}
