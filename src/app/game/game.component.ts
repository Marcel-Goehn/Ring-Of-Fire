import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  firebaseService = inject(FirebaseService);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((param) => {
      console.log(param);
      this.firebaseService.getDocSnapShot(param['id'], (gameData) => {
        this.game.players = gameData.players;
        this.game.stack = gameData.stack;
        this.game.playedCards = gameData.playedCards;
        this.game.currentPlayer = gameData.currentPlayer;
      });
    })
  }


  newGame(): void {
    this.game = new Game;
    // this.firebaseService.addDocument(this.game.toJSON());
  }


  takeCard(): void {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
      }
      this.pickCardAnimation = true;
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000)
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
      }
    });
  }
}
