import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private afs: AngularFirestore) { }


readCampus() {
  return this.afs.collection('campus').snapshotChanges();
}

}