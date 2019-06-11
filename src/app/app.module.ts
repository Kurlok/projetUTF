import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import * as firebase from 'firebase';
import { MenuPopoverComponent } from './menu-popover/menu-popover.component';
import { CampusService } from './services/campus.service';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, MenuPopoverComponent],
  entryComponents: [MenuPopoverComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    CampusService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },
    { provide: FirestoreSettingsToken, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
