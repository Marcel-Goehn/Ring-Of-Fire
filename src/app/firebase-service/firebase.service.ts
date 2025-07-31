import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);
  unsubData;

  constructor() {
    this.unsubData = this.snapShotIt();
  }


  snapShotIt() {
    return onSnapshot(collection(this.firestore, 'card'), (snapshot) => {
      snapshot.forEach(data => {
        console.log(data.data());
      })
    })
  }
}
