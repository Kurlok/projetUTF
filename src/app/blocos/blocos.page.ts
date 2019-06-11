import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BlocosService } from 'src/app/services/blocos.service';
import { CampusService } from 'src/app/services/campus.service';



@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage implements OnInit {

  private blocos: any;

  constructor(private blocosService: BlocosService, campusService: CampusService) { }

  ngOnInit() {
    this.blocosService.readBlocos('pontagrossa').subscribe(data => { //Arrumar o pontagrossa para uma variável
      this.blocos = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         descricao: e.payload.doc.data()['descricao'],
         latitude: e.payload.doc.data()['latitude'],
         longitude: e.payload.doc.data()['longitude'],
       };
     })
     console.log(this.blocos);
    
    });

}
}

