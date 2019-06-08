import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html',
  styleUrls: ['./cursos-modal.component.scss'],
})
export class CursosModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }
  
  async close(){
    await this.modalController.dismiss();
  }

  ngOnInit() {}

}
