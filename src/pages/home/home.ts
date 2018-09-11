import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ActivityPage } from '../activity/activity';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bt_devicesFound: {}[];
  constructor(public navCtrl: NavController, private btSerial: BluetoothSerial, public toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.turnONBluetooth();
  }

  turnONBluetooth(){
    this.btSerial.enable().then(success => {
      this.presentToast('Bluetooth is enabled');
    });

    this.startScan();

    // this.btSerial.setDeviceDiscoveredListener().subscribe(devices => {
    //   this.bt_devicesFound = devices;
    //   alert(this.bt_devicesFound.length + ' Devices Found');

    //   devices.forEach(function(device) {
    //     // console.log(device.id);
    //     alert(device.id.toString());
    //   });
      
    // }, failure =>{
    //   this.presentToast('No device Found');
    // });
  }

  turnOFFBluetooth(){
    this.btSerial.showBluetoothSettings();
  }

  loadPage(event, device){
    this.navCtrl.push(ActivityPage, {
      bt_device: device
    });
  }

  startScan(){
    this.btSerial.discoverUnpaired().then(devices => {
        this.bt_devicesFound = devices;
        this.presentAlert('Unpaired Devices', this.bt_devicesFound.length + ' Unpaired Devices Found');

        this.btSerial.list().then(devs=>{
          this.presentAlert('BT List', devs.toString());
        }).catch(err=>{

        });
        
        // devices.forEach(function(device) {
        //   alert(device.toString());
        // });
        
      }, failure =>{
        this.presentToast('No device Found');
    });
  }

  stopScan(){
    this.navCtrl.push(ActivityPage);
  }

  presentAlert(tytle, subT) {
    let alert = this.alertCtrl.create({
      title: tytle,
      subTitle: subT,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
