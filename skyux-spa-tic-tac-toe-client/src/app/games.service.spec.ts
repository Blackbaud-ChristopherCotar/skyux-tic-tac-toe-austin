import {ReflectiveInjector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';
import { GamesService } from './games.service';
import { GameModel } from "./games.service";

describe('GamesService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      GamesService
    ]);
    this.service = this.injector.get(GamesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('#getAll calls HTTP GET on /games and returns the list', fakeAsync(() => {
    let result: GameModel[];
    let error: any;

    this.service.getAll()
      .subscribe(
        (games: GameModel[]) => result = games,
        err => error = err
      );

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([{ id: 5, humanPlayerFirst: true}])
    })));
    tick();

    expect(this.lastConnection.request.method).toBe(RequestMethod.Get);
    expect(result).toBeDefined();
    expect(error).toBeUndefined();
  }));

  it('#create calls HTTP POST on my service with the specified human player first',
    fakeAsync(() => {
        let result: GameModel;
        let error: any;

        this.service.create(true)
          .subscribe(
            (game: GameModel) => result = game,
            err => error = err
          );
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({ id: 5, humanPlayerFirst: true})
        })));
        tick();

        expect(this.lastConnection.request.method).toBe(RequestMethod.Post);
        expect(result).toBeDefined();
        expect(error).toBeUndefined();
  }));
});
