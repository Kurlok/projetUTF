import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CampusService } from '../services/campus.service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class MenuPopoverComponent implements OnInit {
  private campus: any;

  constructor(
    public popoverController: PopoverController,
    protected campusService: CampusService
    ) { }

  ngOnInit() {
    this.campusService.readCampus().subscribe(data => {
      this.campus = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
         iframe: e.payload.doc.data()['iframe']
       };
     })
     console.log("[POPUP] campus:" + this.campus);
     console.log("[POPUP] campusSelecionado:" + this.campusService.campusSelecionado);
    
    });

  }

  close(){
    this.popoverController.dismiss();
  };

}
