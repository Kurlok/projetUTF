import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';
import { CursosModalComponent } from '../cursos-modal/cursos-modal.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

 
  constructor(private modalController: ModalController) { }
 
  ngOnInit() {

  }
 
  async showModal(){
    const modal = await this.modalController.create({
      component: CursosModalComponent
    })
    await modal.present()
  }
}

