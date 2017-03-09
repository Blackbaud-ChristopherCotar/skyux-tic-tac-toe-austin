import { Component , OnInit } from '@angular/core';
import {GamesService} from './games.service';
import {GameModel} from './games.service';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html'
})
export class GamesListComponent {
  games: GameModel[];
  errorMessage: any;

  constructor(private service: GamesService) {
    this.games = [];
  }

  public ngOnInit() {
    this.service.gameAdded
      .subscribe(() => this.getAll());
    this.getAll();
  }

  private getAll(): void {
    this.service.getAll()
      .subscribe(
        games => this.games = games,
        err => this.errorMessage = err
      );
  }
}
