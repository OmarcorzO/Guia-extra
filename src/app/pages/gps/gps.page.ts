import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { companies } from '../../../assets/data/companies';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {
  locationSearched: any = companies;
  location = localStorage.getItem('location');
  locationSelected: any;
  coords: any;

  constructor(
    private modal: ModalController,
    private nativeGeocoder: NativeGeocoder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.location);
  }

  selectLocation(location: any): void {
    console.log(location);

    localStorage.setItem('location', location.city);
    this.locationSelected = location.city;
    this.location = location.city;
    this.searchLocation(location);
  }

  searchLocation(location: any) {
    this.getCity(location.coordinates.lat, location.coordinates.long);
  }

  closeModal() {
    this.modal.dismiss();
  }

  async locate() {
    // Coordenadas Cell
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log('Coords: ', this.coords);
    this.getCity(this.coords.latitude, this.coords.longitude);
  }

  getCity(latitude: number, longitude: number) {
    // Coordenadas city
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.saveCity(result), console.log(result);
      })
      .catch((error: any) => {
        this.presenteAlert1();
      });
  }

  saveCity(result: any) {
    console.log(JSON.stringify(result));
  }

  async presenteAlert1() {
    const alert = await this.alertController.create({
      header: 'Exitoso',
      message: 'Localización suministrada por consola',
      buttons: ['Ok'],
    });
    alert.present();
  }

  cityFounded() {}
}
