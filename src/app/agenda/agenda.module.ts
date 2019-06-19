import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgendaPage } from './agenda.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import localeBr from '@angular/common/locales/pt-PT';
registerLocaleData(localeBr);

const routes: Routes = [
  {
    path: '',
    component: AgendaPage
  }
];

@NgModule({
  imports: [
    NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],

  declarations: [AgendaPage]
})
export class AgendaPageModule {}
