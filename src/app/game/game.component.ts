import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCardAnimation: boolean = false;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
  }


  newGame(): void {
    this.game = new Game;
    console.log(this.game);
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
