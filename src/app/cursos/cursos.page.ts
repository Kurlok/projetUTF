import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BlocosService } from 'src/app/services/blocos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

 
  constructor(private blocoService: BlocosService) { }
 
  ngOnInit() {

  }
 

}

