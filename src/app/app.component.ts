import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController } from '@ionic/angular';
import { MenuPopoverComponent } from './menu-popover/menu-popover.component';

import {Pipe, PipeTransform, NgModule} from '@angular/core'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { CampusService } from './services/campus.service';
import { Router } from '@angular/router';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popoverController: PopoverController,
    protected campusService: CampusService,
    private router: Router
  ) {
    if (campusService.campusSelecionado == null) campusService.campusSelecionado = 'pontagrossa'; //Define como padrão o campus pontagrossa quando abre o app.

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
       component: MenuPopoverComponent,
       event: ev,
       translucent: true
    });
    return await popover.present();
  }

  abrirURL(id: string) { // Método criado pois [routerLink] estava bugado.
    this.router.navigateByUrl(this.campusService.campusSelecionado + '/' + id);
  }
  
}
export class Menu {

  constructor(private menu: MenuController) { }
  
    openFirst() {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
  
    openEnd() {
      this.menu.open('end');
    }
  
    openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
    }
  
  }


  
