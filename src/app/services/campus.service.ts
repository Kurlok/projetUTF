import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Campus {
  id?: string,
  nome: string,
  iframe: string
}


@Injectable({
  providedIn: 'root'
})
export class CampusService {
  private campusCollection: AngularFirestoreCollection<any>;
  public campusSelecionado: string;
  private campus: Observable<any>;
  constructor(private afs: AngularFirestore) { 
    this.campusCollection = this.afs.collection<Campus>('campus'); //arrumnar
    this.campus = this.campusCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

readCampus() {
  return this.afs.collection('campus').snapshotChanges();
}

getCampus(id: string): Observable<Campus> {
  return this.campusCollection.doc<Campus>(id).valueChanges().pipe(
    take(1),
    map(campus => {
      campus.id = id;
      return campus
    })
  );
}

}