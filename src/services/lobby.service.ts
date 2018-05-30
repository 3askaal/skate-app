import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from './shared.service';
import { GameService } from './game/game.main.service';
import { SocketService } from './socket.service';

import { Game } from '../models/models';

import { Utils } from '../utils';

import * as _ from 'lodash';

@Injectable()
export class LobbyService {
  host: string = '';

  isHost: boolean = false;
  isReadyToStart: boolean = false;

  data: Game = {
    word: 'skate',
  };

  constructor(
    private router: Router,
    private SHARED: SharedService,
    private GAME: GameService,
    private SOCKET: SocketService,
  ) {}

  public join(host) {
    this.host = host;
    this.isHost = this.host === this.SHARED.user._id;

    this.SOCKET.connect().subscribe(() => {
      this.listen();
      this.SOCKET.request(`/lobby/${this.host}/join`, {
        user: this.SHARED.user,
        data: this.data,
      });
    });
  }

  public checkActivePlayers() {
    let activePlayers = _.countBy(this.data.players, 'active');
    this.isReadyToStart = activePlayers.true > 1;
  }

  public updateSettings(settings) {
    this.SOCKET.request(`/lobby/${this.host}/settings`, settings);
  }

  public createGame() {
    // FOR DEMO
    this.data.current = this.SHARED.user._id;
    // FOR DEMO
    this.data.players = _.filter(this.data.players, 'active');
    this.SOCKET.request(`/lobby/${this.host}/start`, this.data);
  }

  public listen() {
    this.SOCKET.sub(`/lobby/${this.host}`).subscribe((event: any) => {
      switch (event.type) {
        case 'data:update':
          this.data.players = event.data.players;
          this.data.word = event.data.word;
          this.data.ref = event.data.ref;
          this.checkActivePlayers();
          break;

        case 'game:created':
          this.GAME.init(event.data.game);
          break;

        case 'lobby:ended':
          this.router.navigate(['main']);
          this.SOCKET.disconnect();
          break;
      }
    });
  }
}
