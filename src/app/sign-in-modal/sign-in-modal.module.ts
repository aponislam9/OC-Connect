import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInModalPageRoutingModule } from './sign-in-modal-routing.module';

import { SignInModalPage } from './sign-in-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInModalPageRoutingModule
  ],
  declarations: [SignInModalPage]
})
export class SignInModalPageModule {}
