import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },

  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'blocos', loadChildren: './blocos/blocos.module#BlocosPageModule' },
  { path: 'pesquisa', loadChildren: './pesquisa/pesquisa.module#PesquisaPageModule' },
  { path: 'agenda', loadChildren: './agenda/agenda.module#AgendaPageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'cursos', loadChildren: './cursos/cursos.module#CursosPageModule' },
  { path: 'blocosCadastro', loadChildren: './blocos-cadastro/blocos-cadastro.module#BlocosCadastroPageModule' },
  { path: 'bloco/:id', loadChildren: './blocos-cadastro/blocos-cadastro.module#BlocosCadastroPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
