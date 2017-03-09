import { Component } from '@angular/core';
import { GamesService } from './games.service';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html'
})
export class CreateGameComponent {
  public isHumanPlayerFirst: boolean;
  public output: string;

  constructor(private service: GamesService) {
    this.isHumanPlayerFirst = true;
  }

  handleClick() {
    this.service.create(this.isHumanPlayerFirst)
      .subscribe(
        game => this.output = JSON.stringify(game),
        err => this.output = JSON.stringify(err)
      );
  }
}

