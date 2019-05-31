import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BlocosService, Bloco } from 'src/app/services/blocos.service';



@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage implements OnInit {

  private blocos: Observable<Bloco[]>;

  constructor(private blocosService: BlocosService) { }

  ngOnInit() {
    this.blocos = this.blocosService.getBlocos();
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
