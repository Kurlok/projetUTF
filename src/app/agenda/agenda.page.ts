import { Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { formatDate, registerLocaleData } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import localeBr from '@angular/common/locales/pt-PT';
import { AgendaService } from 'src/app/services/agenda.service';
import { CampusService } from 'src/app/services/campus.service';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
registerLocaleData(localeBr)

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  private agenda: any;

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
 @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private agendaService: AgendaService, campusService: CampusService) { }
 
  ngOnInit() {
    this.agendaService.readAgenda('pontagrossa').subscribe(data => { //Arrumar o pontagrossa para uma variável
      this.agenda = data.map(e => {
       return {
         id: e.payload.doc.id,
         titulo: e.payload.doc.data()['titulo'],
         descricao: e.payload.doc.data()['descricao'],
         startTempo: e.payload.doc.data()['startTempo'],
         endTempo: e.payload.doc.data()['endTempo'],
         diaTodo: e.payload.doc.data()['diaTodo'],
       };
     })
     console.log("map this.agenda" + this.agenda);
     var i=0;
     while (this.agenda[i]) {
     let event = {
       title: this.agenda[i].titulo,
       desc: this.agenda[i].descricao,
       startTime: new Date(this.agenda[i].startTempo),
       endTime: new Date(this.agenda[i].endTempo),
       allDay: this.agenda[i].diaTodo
     };
     console.log(event.startTime);
     console.log(event.startTime);
     console.log(event.startTime);
     this.eventSource.push(event);
     this.myCal.loadEvents();
     this.resetEvent();
     i++;
    }
    });

  }
  
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

    // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader:  event.desc,
    message: '<h5>De: ' + start + '<br><br>Até: ' + end + '</h5>',
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}
}

export class Menu {

  constructor(private menu: MenuController) { }
  
    openFirst() {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
  
    openEnd() {
      this.menu.open('end');
    }
  
    openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
    }
  }
