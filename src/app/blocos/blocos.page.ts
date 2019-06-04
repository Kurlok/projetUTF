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

  private blocos: Bloco[];

  constructor(private blocosService: BlocosService) {
    this.blocosService.getBlocos()
    .subscribe(items=>{
      console.log('teste');
      this.blocos = items;
    });
    
   }

  ngOnInit() {
 
  }

}

