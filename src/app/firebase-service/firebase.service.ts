import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, doc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);
  players: string[] = [];
  stack: string[] = [];
  playedCards: string[] = [];
  currentPlayer: number = 0;
  unsubData?: () => void;


  getDocSnapShot(docId: string, callback: (gameData: Game) => void): void {
  this.unsubData = onSnapshot(this.getDocRef(docId), (docSnap) => {
    const data = docSnap.data() as Game;
    callback(data);
  });
}


  async addDocument(obj: any): Promise<void> {
    await addDoc(collection(this.firestore, "card"), {
      players: obj.players,
      stack: obj.stack,
      playedCards: obj.playedCards,
      currentPlayer: obj.currentPlayer
    });
  }


  getDocRef(docId: string) {
    return doc(this.firestore, 'card', docId);
  }
}
