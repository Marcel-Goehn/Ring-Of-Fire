import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInstructionsComponent } from './game-instructions.component';

describe('GameInstructionsComponent', () => {
  let component: GameInstructionsComponent;
  let fixture: ComponentFixture<GameInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameInstructionsComponent]
    });
    fixture = TestBed.createComponent(GameInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
