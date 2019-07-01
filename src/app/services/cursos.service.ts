import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CampusService } from './campus.service';


export interface Curso {
  id?: string,
  nome: string,
  duracao: string,
  tipo: string,
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos: Observable<Curso[]>;
  private cursosCollection: AngularFirestoreCollection<Curso>;
  public campusSelecionado: string;

  constructor(
    private afs: AngularFirestore,     
    private campusService: CampusService
  ) { }

  readCursos() {
    return this.afs.collection('campus/'+this.campusService.campusSelecionado+'/cursos').snapshotChanges();
  }

}
