import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  currentDevice: {};
  dataReceived: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private btSerial: BluetoothSerial, private toastCtrl: ToastController) {
    this.currentDevice = this.navParams.get('bt_device');
    this.connectToDevice(this.currentDevice);

  }

  connectToDevice(device){
    this.btSerial.connect(device.id).subscribe((data) =>{
      this.presentToast('Connected to ' + device.name);

    }, failure =>{
      this.presentToast('Failed to connect');
    });
  }

  writeToRobot(data){
    this.btSerial.write(data).then(response => {
      this.presentToast(data + ' sent');
      this.presentToast(response + ' returned');
    }, failure => {
      this.presentToast('Failed to send data');
    });
  }

  readFromRobot(){
    this.btSerial.read().then(data => {
      this.presentToast(data + ' received');
      this.dataReceived = data;
    }, failure => {
      this.presentToast('Unable to receive data');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
