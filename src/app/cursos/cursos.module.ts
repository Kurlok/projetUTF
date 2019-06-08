import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CursosModalComponent } from  '../cursos-modal/cursos-modal.component';
import { IonicModule } from '@ionic/angular';

import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage
  }
];

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CursosPage, CursosModalComponent],
  entryComponents: [CursosModalComponent]
})
export class CursosPageModule {}
