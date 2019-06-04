import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocosService, Bloco } from 'src/app/services/blocos.service';
import { ToastController } from '@ionic/angular';
import { rootRoute } from '@angular/router/src/router_module';

@Component({
  selector: 'app-blocos-cadastro',
  templateUrl: './blocos-cadastro.page.html',
  styleUrls: ['./blocos-cadastro.page.scss'],
})

export class BlocosCadastroPage implements OnInit {
 
  bloco: Bloco = {
    nome: '',
    descricao: '',
    latitude: null,
    longitude: null,
    raio: null
  };
 
  constructor(private activatedRoute: ActivatedRoute, private blocoService: BlocosService,
    private toastCtrl: ToastController, private router: Router) { }
 
  ngOnInit() { }
 
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.blocoService.getBloco(id).subscribe(bloco => {
        this.bloco = bloco;
      });
    }
  }
 
  addBloco() {
    this.blocoService.addBloco(this.bloco).then(() => {
      this.router.navigate(['blocos']);
      this.showToast('Bloco adicionado');
    }, err => {
      this.showToast('Houve um erro ao adicionar seu bloco:(');
    });
  }
 
  deleteBloco() {
    this.blocoService.deleteBloco(this.bloco.id).then(() => {
      this.router.navigate(['blocos']);
      this.showToast('Bloco deletado');
    }, err => {
      this.showToast('Houve um erro ao deletar seu bloco:(');
    });
  }
 
  updateBloco() {
    this.blocoService.updateBloco(this.bloco).then(() => {
      this.router.navigate(['blocos']);
      this.showToast('Bloco atualizado');
    }, err => {
      this.showToast('Houve um erro ao atualizar seu bloco:(');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}