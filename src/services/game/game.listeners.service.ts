import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { TrickService } from '../trick.service';
import { GameActionsService } from './game.actions.service';
import { GameStorageService } from './game.storage.service';
import { GameRoutesService } from './game.routes.service';
import { Utils } from '../../utils';
import * as _ from 'lodash';

@Injectable()
export class GameListenersService {
  constructor(
    private SOCKET: SocketService,
    private TRICK: TrickService,
    private GAME_ROUTES: GameRoutesService,
    private GAME_STORAGE: GameStorageService,
  ) {}

  public listen(event) {
    switch (event.type) {
      // case 'user:connected':
      //   this.onUserConnection(state.data);
      //   break;
      //
      // case 'user:disconnected':
      //   this.onUserDisconnection(state.data);
      //   break;
      //
      // case 'user:reconnected':
      //   this.onUserReconnection(state.data);
      //   break;

      case 'data:ready':
        this.onData(event.data);
        break;

      case 'next:player':
        this.onNextPlayer(event.data);
        break;

      case 'trick:chosen':
        this.onTrickChosen(event.data);
        break;

      case 'defense':
        this.onDefense(event.data);
        break;

      case 'defense:applied':
        this.onDefenseApplied(event.data);
        break;

      case 'game:over':
        this.onGameOver();
        break;
    }

    this.GAME_ROUTES.route(event.type);
  }

  // LISTENERS

  private onData(data) {
    this.GAME_STORAGE.data = Utils.formatGame(data);
    this.GAME_STORAGE.defineMe();
    this.GAME_STORAGE.defineCurrent();
  }

  private onNextPlayer(data) {
    this.GAME_STORAGE.data.current = data.current;
    this.GAME_STORAGE.defineCurrent();
  }

  private onDefenseApplied(data) {
    this.onData(data);
  }

  // (socket only)

  private onDefense(defense) {
    _.find(this.GAME_STORAGE.data.players, { player: { _id: defense.player } }).defense = defense.good;
  }

  private onTrickChosen(trick) {
    this.GAME_STORAGE.current.trick = trick;
  }

  private onGameOver() {
    this.SOCKET.disconnect();
  }

  // private onUserConnection(data) {}

  // private onUserDisconnection(data) {
  //   let player = _.find(this.data.players, { player: { _id: data.user }});
  //
  //   if (this.data.players.length > 2) {
  //     this.DIALOG.show({
  //       title: 'Player Disconnected',
  //       message: `${player.player.username} disconnected. Press continue if we pursue without him.`,
  //       buttons: [
  //         { label: 'continue', method: this.DIALOG.close }
  //       ]
  //     });
  //   } else {
  //     this.DIALOG.show({
  //       title: 'Player Disconnected',
  //       message: `${player.player.username} disconnected. Waiting for him to reconnect.`
  //     });
  //   }
  // }

  // private onUserReconnection() {
  //   this.DIALOG.close();
  // }
}
