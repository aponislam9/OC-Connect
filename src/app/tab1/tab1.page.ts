import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Md5} from 'ts-md5/dist/md5';
import { AlertController, ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: Storage, private _md5: Md5, private alertCtrl: AlertController, private camera: Camera, private file: File, public actionSheetController: ActionSheetController) {}

  company: string;
  title: string;
  banner;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;

  srcURL = "";

  buttonShow = true;


  
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

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
    this.buttonShow = false;
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.srcURL = imageData;
      this.event.banner = this.srcURL;
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
