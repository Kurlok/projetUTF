import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CampusService } from 'src/app/services/campus.service';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {
  private campus: any;

  constructor(
    public popoverController: PopoverController,
    private campusService: CampusService,
    ) { }

  ngOnInit() {
    this.campusService.readCampus().subscribe(data => {
      this.campus = data.map(e => {
       return {
         id: e.payload.doc.id,
         nome: e.payload.doc.data()['nome'],
       };
     })
     console.log(this.campus);
    
    });

  }

  close(){
    this.popoverController.dismiss();
  };

}
