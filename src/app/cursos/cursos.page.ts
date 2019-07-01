import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';
import { CursosModalComponent } from '../cursos-modal/cursos-modal.component';
import { CursosService } from '../services/cursos.service';
import { CampusService } from 'src/app/services/campus.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})

export class CursosPage implements OnInit {

  private cursos: any;

  constructor(
    private modalController: ModalController,
    private cursosService: CursosService,

    ) { }
 
  ngOnInit() {
    this.cursosService.readCursos().subscribe(data => {
      this.cursos = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         descricao: e.payload.doc.data()['descricao'],
         duracao: e.payload.doc.data()['duracao'],
         tipo: e.payload.doc.data()['tipo']
       };
     })
    });
  }
 
  async showModal(){
    const modal = await this.modalController.create({
      component: CursosModalComponent
    })
    await modal.present()
  }
}

