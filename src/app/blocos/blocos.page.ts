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

  private blocos: any;

  constructor(private blocosService: BlocosService) { }

  ngOnInit() {
    this.blocosService.readBlocos().subscribe(data => {
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
     console.log(this.blocos);
    
    });

}
}

