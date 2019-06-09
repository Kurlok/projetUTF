import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';
import { SalasService } from 'src/app/services/salas.service';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  private salas: any;
  private salasBackup: any
  private blocos: any;
  constructor(
    private blocosService: BlocosService,
    private salasService: SalasService
    ) { }
  
  ngOnInit() {
    this.blocosService.readBlocos().subscribe(data => {
      this.blocos = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         descricao: e.payload.doc.data()['descricao'],
         raio: e.payload.doc.data()['raio']
       };
     })
        
    });
    this.salasService.readSalas().subscribe(data => {
      this.salas = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         descricao: e.payload.doc.data()['descricao'],
         piso: e.payload.doc.data()['piso']
       };
     })
     this.salasBackup = this.salas;
     console.log(this.blocos);
     console.log(this.salas);

    });

}

inicializarItems(){
  this.salas = this.salasBackup;
}

filtrarLista(evt){
  this.inicializarItems();
  const termoProcurado = evt.srcElement.value;
  
  if (!termoProcurado){
    return;
  }
  this.salas = this.salas.filter(salaAtual => {
    if (salaAtual.nome && termoProcurado) {
      if (salaAtual.nome.toLowerCase().indexOf(termoProcurado.toLowerCase()) > -1) {
        return true;
      }
      if (salaAtual.piso && termoProcurado) {
        if (salaAtual.piso.toLowerCase().indexOf(termoProcurado.toLowerCase()) > -1) {
          return true;
        }
        return false
      }
      return false;
    }
  });

}

}

