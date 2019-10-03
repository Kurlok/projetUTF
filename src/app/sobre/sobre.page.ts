import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SobreService } from '../services/sobre.service';
import { CampusService } from '../services/campus.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  private sobre: any;

  constructor(private sobreService: SobreService, campusService: CampusService) { }

  ngOnInit() {
    this.sobreService.readSobre('pontagrossa').subscribe(data => { //Arrumar o pontagrossa para uma variável
      this.sobre = data.map(e => {
       return {
         id: e.payload.doc.id,
         endereco: e.payload.doc.data()['endereco'],
         cep: e.payload.doc.data()['cep'],
         telefone: e.payload.doc.data()['telefone'],
         img: e.payload.doc.data()['img'],
       };
     })
     console.log(this.sobre);
    
    });
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

