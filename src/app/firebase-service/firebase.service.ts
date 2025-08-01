import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, doc, updateDoc } from '@angular/fire/firestore';
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
  idFromLastCreatedGame: string = '';
  unsubData?: () => void;


  getDocSnapShot(docId: string, callback: (gameData: Game) => void): void {
  this.unsubData = onSnapshot(this.getDocRef(docId), (docSnap) => {
    const data = docSnap.data() as Game;
    callback(data);
  });
}


  async addDocument(obj: any) {
    await addDoc(collection(this.firestore, "card"), {
      players: obj.players,
      stack: obj.stack,
      playedCards: obj.playedCards,
      currentPlayer: obj.currentPlayer,
      pickCardAnimation: obj.pickCardAnimation,
      currentCard: obj.currentCard
    }).then(
      (gameInfo) => {
        this.idFromLastCreatedGame = gameInfo.id;
      });
  }


  async updateGame(obj: any, docId: string) {
    await updateDoc(this.getDocRef(docId), {
      currentPlayer: obj.currentPlayer,
      playedCards: obj.playedCards,
      players: obj.players,
      stack: obj.stack,
      pickCardAnimation: obj.pickCardAnimation,
      currentCard: obj.currentCard
    })
  }


  getDocRef(docId: string) {
    return doc(this.firestore, 'card', docId);
  }
}
