import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Sobre {
  id?: string,
  endereco : string,
  cep: string,
  telefone: string,
  img: string
}

@Injectable({
  providedIn: 'root'
})

export class SobreService {
  private sobre: Observable<Sobre[]>;
  private sobreCollection: AngularFirestoreCollection<Sobre>;
  
  constructor(private afs: AngularFirestore) {

  }

   readSobre(campus: string) {

    return this.afs.collection('campus/'+ campus +'/sobre').snapshotChanges();
  }

  getAgenda(id: string): Observable<Sobre> {
    return this.sobreCollection.doc<Sobre>(id).valueChanges().pipe(
      take(1),
      map(sobre => {
        sobre.id = id;
        return sobre
      })
    );
  }

  addAgenda(sobre: Sobre): Promise<DocumentReference> {
    return this.sobreCollection.add(sobre);
  }
}
