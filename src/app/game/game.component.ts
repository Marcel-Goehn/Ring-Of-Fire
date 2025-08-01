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
  gameId: string = '';
  firebaseService = inject(FirebaseService);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((param) => {
      this.gameId = param['id'];
      console.log(this.gameId);
      this.firebaseService.getDocSnapShot(param['id'], (gameData) => {
        this.game.players = gameData.players;
        this.game.stack = gameData.stack;
        this.game.playedCards = gameData.playedCards;
        this.game.currentPlayer = gameData.currentPlayer;
        this.game.pickCardAnimation = gameData.pickCardAnimation;
        this.game.currentCard = gameData.currentCard;
      });
    })
  }


  newGame(): void {
    this.game = new Game;
  }


  takeCard(): void {
    if (!this.game.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card !== undefined) {
        this.game.currentCard = card;
      }
      this.game.pickCardAnimation = true;
      this.updateGame();
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.updateGame();
      }, 1000)
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
        this.updateGame();
      }
    });
  }


  updateGame() {
    this.firebaseService.updateGame(this.game, this.gameId);
  }
}
