import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './game/player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './game/dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInstructionsComponent } from './game/game-instructions/game-instructions.component';
import {MatCardModule} from '@angular/material/card';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-649bc","appId":"1:117962311594:web:89607dbcfeb9857d7a0dd3","storageBucket":"ring-of-fire-649bc.firebasestorage.app","apiKey":"AIzaSyBfJ1w1Vlbw97ZkVIrFNXltb1RrgobAEKI","authDomain":"ring-of-fire-649bc.firebaseapp.com","messagingSenderId":"117962311594"})),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
