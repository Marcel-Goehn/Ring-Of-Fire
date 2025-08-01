import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

  firebaseService = inject(FirebaseService);

  constructor(private router: Router) {}

  
  async newGame() {
    const game = new Game();
    await this.firebaseService.addDocument(game.toJSON());
    this.router.navigateByUrl(`/game/${this.firebaseService.idFromLastCreatedGame}`);
  }
}
