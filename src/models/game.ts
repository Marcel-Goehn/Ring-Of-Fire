export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation: boolean = false;
  public currentCard: string = '';

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push(`spade_${i}`);
      this.stack.push(`hearts_${i}`);
      this.stack.push(`clubs_${i}`);
      this.stack.push(`diamonds_${i}`);
    }
    shuffle(this.stack);
  }


  public toJSON() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    };
  }
}


function shuffle(array: string[]) {
  let currentIndex: number = array.length;

  while (currentIndex != 0) {

    let randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}