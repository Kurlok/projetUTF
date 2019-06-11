import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { BlocosService, Bloco } from 'src/app/services/blocos.service';
import { Observable, Subject } from 'rxjs';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  private blocos: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private navCtrl: NavController,
    private blocosService: BlocosService
  ) {

  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {

    let watch = this.geolocation.watchPosition();

    let latLongCampus = new google.maps.LatLng(-25.051196, -50.132609);
    let mapOptions = {
      center: latLongCampus,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    }

    // this.getAddressFromCoords(-25.051196, -50.132609);

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //Coloca os marcadores dos blocos no mapa
    var latLong;
    this.blocosService.readBlocos('pontagrossa').subscribe(data => { //Arrumar o pontagrossa para uma variável
      this.blocos = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          latitude: e.payload.doc.data()['latitude'],
          longitude: e.payload.doc.data()['longitude'],
          raio: e.payload.doc.data()['raio']
        };
      })
      for (var i = 0; i < this.blocos.length; i++) {
        latLong = new google.maps.LatLng(this.blocos[i].latitude, this.blocos[i].longitude);
        var marker = new google.maps.Marker({
          position: latLong,
          map: this.map,
          title: this.blocos[i].nome
        });
        console.log(this.blocos);
      }
    });

    //this.geolocation.getCurrentPosition().then((resp) => {
    // let latLngAtualiza = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
    // this.map.setCenter(latLngAtualiza);
    // this.map.addListener('tilesloaded', () => {
    //  console.log('accuracy', this.map);
    //  this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    // });
    // }).catch((error) => {
    //   console.log('Erro buscando a sua localização', error);
    // });

    var marker = new google.maps.Marker(null);

    //Observa a posição atual do dispositivo e cria marcador
    this.geolocation.watchPosition({timeout: 2500}).subscribe((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(latLng);
      marker.setOptions({
        map: this.map,
        position: latLng,
        enableHighAccuracy: true
      });
      // marker.setMap(null);
      // marker = new google.maps.Marker({
      //   map: this.map,
      // //  icon:  'assets/imgs/pins/redpin.png',
      //   position: latLng,
      //   enableHighAccuracy:true
      //  });
      //  marker.setMap(this.map);

      let message = "Você!!!";
    }, (err) => { console.log(err); });

  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }
}