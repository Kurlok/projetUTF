import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';



export interface Bloco {
  id?: string,
  nome: string,
  descricao: string,
  latitude: number,
  longitude: number,
  raio: number
}

@Injectable({
  providedIn: 'root'
})

export class BlocosService {
  private blocos: Observable<Bloco[]>;
  private blocoCollection: AngularFirestoreCollection<Bloco>;
 
  constructor(private afs: AngularFirestore) {
    this.blocoCollection = this.afs.collection<Bloco>('blocos');
    this.blocos = this.blocoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getBlocos(): Observable<Bloco[]> {
    return this.blocos;
  }
 
  getBloco(id: string): Observable<Bloco> {
    return this.blocoCollection.doc<Bloco>(id).valueChanges().pipe(
      take(1),
      map(bloco => {
        bloco.id = id;
        return bloco
      })
    );
  }
 
  addBloco(bloco: Bloco): Promise<DocumentReference> {
    return this.blocoCollection.add(bloco);
  }
 
  updateBloco(bloco: Bloco): Promise<void> {
    return this.blocoCollection.doc(bloco.id).update({ name: bloco.nome, descricao: bloco.descricao, latitude: bloco.latitude, longitude: bloco.longitude, raio: bloco.raio });
  }
 
  deleteBloco(id: string): Promise<void> {
    return this.blocoCollection.doc(id).delete();
  }
}