import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';
import { CursosService } from '../services/cursos.service';
import { CampusService } from 'src/app/services/campus.service';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html',
  styleUrls: ['./cursos-modal.component.scss'],
})
export class CursosModalComponent implements OnInit {

  private cursos: any;
  
  constructor(
    private modalController: ModalController,
    private cursosService: CursosService,

    ) { }
  
  async close(){
    await this.modalController.dismiss();
  }

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

}
