import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';



export interface Sala {
  id?: string,
  nome: string,
  descricao: string,
  piso: string
}

@Injectable({
  providedIn: 'root'
})

export class SalasService {
  private salas: Observable<Sala[]>;
  private salasCollection: AngularFirestoreCollection<Sala>;
 
  constructor(private afs: AngularFirestore) {
    this.salasCollection = this.afs.collection<Sala>('campus/pontagrossa/sede/monteirolobato/locais/blococ/salas');
    this.salas = this.salasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  readSalas() {
    return this.afs.collection('campus/pontagrossa/sede/monteirolobato/locais/blococ/salas').snapshotChanges();
  }

}