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
  currentCard: string | undefined = '';


  ngOnInit(): void {
    this.newGame();
  }


  newGame(): void {
    this.game = new Game;
    console.log(this.game);
  }


  takeCard(): void {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500)
    }
  }
}
