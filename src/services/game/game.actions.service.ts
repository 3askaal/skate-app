import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
import { SharedService } from '../shared.service';
import { GameStorageService } from './game.storage.service';
import { GameRoutesService } from './game.routes.service';
import { GameListenersService } from './game.listeners.service';
import * as _ from 'lodash';

@Injectable()
export class GameActionsService {
  constructor(
    private DATA: DataService,
    private SOCKET: SocketService,
    private SHARED: SharedService,
    private GAME_ROUTES: GameRoutesService,
    private GAME_LISTENERS: GameListenersService,
    private GAME_STORAGE: GameStorageService,
  ) {}

  public pickTrick(trick) {
    if (this.GAME_STORAGE.isRef) {
      this.GAME_LISTENERS.listen({ type: 'trick:chosen', data: trick });
    } else {
      this.SOCKET.request(`/game/${this.GAME_STORAGE.id}/trick`, {
        trick: trick,
      });
    }
  }

  public pass() {
    if (this.GAME_STORAGE.isRef) {
      this.DATA.read({
        collection: `game/${this.GAME_STORAGE.id}/pass`,
      }).subscribe((res: any) => {
        this.GAME_LISTENERS.listen(res);
      });
    } else {
      this.SOCKET.request(`/game/${this.GAME_STORAGE.id}/pass`);
    }
  }

  public updateDefense(player) {
    if (!this.GAME_STORAGE.isRef) {
      this.SOCKET.request(`/game/${this.GAME_STORAGE.id}/defense`, {
        defense: {
          player: player.player._id,
          good: player.defense,
        },
      });
    }
  }

  public apply() {
    let turn = {
      player: this.GAME_STORAGE.current.player.player._id,
      trick: this.GAME_STORAGE.current.trick._id,
      good: _.map(_.filter(this.GAME_STORAGE.data.players, ['defense', true]), 'player._id'),
      fail: _.map(_.filter(this.GAME_STORAGE.data.players, ['defense', false]), 'player._id'),
    };

    if (this.GAME_STORAGE.isRef) {
      this.DATA.create(`game/${this.GAME_STORAGE.id}/apply`, {
        turn: turn,
      }).subscribe((res: any) => {
        this.GAME_LISTENERS.listen(res);
      });
    } else {
      this.SOCKET.request(`/game/${this.GAME_STORAGE.id}/apply`, {
        turn: turn,
      });
    }
  }
}
