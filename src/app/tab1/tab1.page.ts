import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Md5} from 'ts-md5/dist/md5';
import { AlertController, ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';




@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {

  constructor(private storage: Storage, private _md5: Md5, private alertCtrl: AlertController, private camera: Camera, private file: File, public actionSheetController: ActionSheetController, private imagePicker: ImagePicker, private webview: WebView) {}

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
  };

  submit() {
    this.gatherInfo();
    this.event.id = Md5.hashStr(this.event.title);
    console.log(this.event);
    this.storage.get("all_events").then(async all_events => {
      //uncomment this line to add to storage
      // all_events.put(event);
      const alert = await this.alertCtrl.create({
        header: "Success",
        message: "Event was created successfully!",
        buttons: ["Okay"]
      });
      await alert.present();
    });
    this.buttonShow = true;
    this.restPage();
  }

  gatherInfo() {
    this.event.title = this.title;
    this.event.company = this.company;
    this.event.date = moment(this.date).format("MMM Do YYYY");
    this.event.startTime = moment(this.startTime).format("LT");
    this.event.endTime = moment(this.endTime).format("LT");
    this.event.description = this.description;
    this.event.location = this.location;
  }

  restPage(){
    this.event.id = "";
    this.event.company = "";
    this.event.title = "";
    this.event.date = null;
    this.event.banner = "";
    this.event.startTime = null;
    this.endTime = null;
    this.location = "";
    this.description = "";
    this.company = "";
    this.title = "";
    this.banner = "";
    this.date = null;
    this.startTime = null;
    this.endTime = null;
    this.location = "";
    this.description = "";

    srcURL = "";
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
    this.camera.getPicture(options).then(async (imageData) => {
      const tempFilename = imageData.substr(imageData.lastIndexOf('/')+1);
      const tempBaseFilesystemPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      const newBaseFileSystemPath = this.file.dataDirectory;
      await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFileSystemPath, tempFilename);
      const storedPhoto = newBaseFileSystemPath + tempFilename;
      this.srcURL = this.webview.convertFileSrc(storedPhoto);
    }, (err) => {
      // Handle error
    });
  }


}
