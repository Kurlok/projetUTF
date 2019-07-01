import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';
import { SalasService } from 'src/app/services/salas.service';
import { CampusService } from 'src/app/services/campus.service';


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

    this.salasService.readSalas().subscribe(data => {
      this.salas = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         descricao: e.payload.doc.data()['descricao'],
         bloco: e.payload.doc.data()['bloco'],
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
      if ((salaAtual.piso || salaAtual.bloco || salaAtual.descricao) && termoProcurado) {
        if ((salaAtual.piso.toLowerCase().indexOf(termoProcurado.toLowerCase()) > -1) || (salaAtual.bloco.toLowerCase().indexOf(termoProcurado.toLowerCase()) > -1) || (salaAtual.descricao.toLowerCase().indexOf(termoProcurado.toLowerCase()) > -1)){
          return true;
        }
        
        return false
      }
      return false;
    }
  });

}

}

