import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable, Timestamp } from 'rxjs';

export interface Agenda {
  id?: string,
  titulo: string,
  descricao: string,
  diaTodo: boolean,
  startTempo: String,
  endTempo: String
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agenda: Observable<Agenda[]>;
  private agendaCollection: AngularFirestoreCollection<Agenda>;
 
  constructor(private afs: AngularFirestore) { 

  }

  readAgenda(campus: string) {

    return this.afs.collection('campus/'+ campus +'/agenda').snapshotChanges();
  }

  getAgenda(id: string): Observable<Agenda> {
    return this.agendaCollection.doc<Agenda>(id).valueChanges().pipe(
      take(1),
      map(agenda => {
        agenda.id = id;
        return agenda
      })
    );
  }

  addAgenda(agenda: Agenda): Promise<DocumentReference> {
    return this.agendaCollection.add(agenda);
  }

}
