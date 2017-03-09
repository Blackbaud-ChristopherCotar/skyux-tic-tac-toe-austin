import { Http } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export interface CompletedReport {
  winnerIndex: number;
}

export interface GameModel {
  id: number;
  humanPlayerFirst: boolean;
  board: number[][];
  startedOn: Date;
  completed?: CompletedReport;
}

@Injectable()
export class GamesService {
  @Output()
  public gameAdded: EventEmitter<GameModel>;
  constructor(private http: Http) {
    this.gameAdded = new EventEmitter<GameModel>();
  }

  public getAll(): Observable<GameModel[]> {
    return this.http.get('https://localhost:10010/games')
      .map(response => response.json().games);
  }

  public create(humanPlayerFirst: boolean): Observable<GameModel> {
    let payload = { humanPlayerFirst: humanPlayerFirst };
    return this.http.post('https://localhost:10010/games', payload)
      .map(response => response.json())
      .do(game => this.gameAdded.emit(game));
  }

}
