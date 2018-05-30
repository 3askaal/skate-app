import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { User, Player, Turn, Game, Current } from '../../models/models';
import * as _ from 'lodash';

@Injectable()
export class GameStorageService {
  constructor(private SHARED: SharedService) {}

  public id: string;
  public data: Game;

  public initialized = false;
  public waitingForUser = false;
  public isCurrent: boolean = false;
  public isRef: boolean = false;

  public me: Player;

  public current: Current = {
    player: null,
    trick: null,
  };

  public votes: any = {
    toRemovePlayer: {
      player: null,
      votes: 0,
    },
  };

  public defineMe() {
    this.me = _.find(this.data.players, {
      player: { _id: this.SHARED.user._id },
    });
    this.me.me = true;
  }

  public defineCurrent() {
    this.current.player = _.find(this.data.players, {
      player: { _id: this.data.current },
    });
    this.current.player.current = true;

    if (this.current.player.me) {
      this.isCurrent = true;
    } else {
      this.isCurrent = false;
    }
  }

  public defineRef() {
    if (this.data.ref === this.SHARED.user._id) {
      this.isRef = true;
    }
  }

  public getCurrentPlayerUsername() {
    return this.isRef || this.isCurrent ? 'U' : this.current.player.player.username;
  }
}
