import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popoverController: PopoverController, private storage: Storage) { }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event
    });
    return await popover.present();
  }

}
