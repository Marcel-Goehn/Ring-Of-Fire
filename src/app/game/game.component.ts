import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCardAnimation: boolean = false;
  currentCard: string = '';


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
      console.log(this.game.playedCards);
      console.log(this.game.stack);

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000)
    }
  }
}
