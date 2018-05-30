import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { TrickService } from '../trick.service';
import { SharedService } from '../shared.service';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
import { DialogService } from '../dialog.service';
import { GameActionsService } from './game.actions.service';
import { GameStorageService } from './game.storage.service';
import { GameRoutesService } from './game.routes.service';
import { GameListenersService } from './game.listeners.service';
import { MSG } from '../../constants/messages';
import * as _ from 'lodash';

@Injectable()
export class GameService {
  constructor(
    private DIALOG: DialogService,
    private GAME_STORAGE: GameStorageService,
    private GAME_ACTIONS: GameActionsService,
    private GAME_ROUTES: GameRoutesService,
    private GAME_LISTENERS: GameListenersService,
    private TRICK: TrickService,
    private SOCKET: SocketService,
    private SHARED: SharedService,
  ) {}

  public init(game) {
    this.GAME_STORAGE.id = game._id;
    this.GAME_STORAGE.data = game;
    this.GAME_STORAGE.defineRef();
    this.TRICK.getTricks();

    if (this.GAME_STORAGE.isRef) {
      this.launch();
    } else {
      this.connect();
    }
  }

  public connect() {
    this.SOCKET.connect().subscribe((data) => {
      this.subscriptions();
      this.SOCKET.request(`/game/${this.GAME_STORAGE.id}/join`, {
        user: this.SHARED.user._id,
      });
    });
  }

  public launch() {
    this.SOCKET.disconnect();
    this.GAME_LISTENERS.listen({
      type: 'data:ready',
      data: this.GAME_STORAGE.data,
    });
    this.GAME_ROUTES.route('data:ready');
  }

  private subscriptions() {
    this.SOCKET.sub(`/game/${this.GAME_STORAGE.id}`).subscribe((event: any) => {
      this.GAME_LISTENERS.listen(event);
    });
  }
}
