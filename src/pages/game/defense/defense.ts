import { Component } from '@angular/core';

import { GameService } from '../../../services/game/game.main.service';
import { GameActionsService } from '../../../services/game/game.actions.service';
import { GameStorageService } from '../../../services/game/game.storage.service';
import { GameRoutesService } from '../../../services/game/game.routes.service';
import * as _ from 'lodash';

@Component({
  templateUrl: './defense.html',
})
export class DefensePage {
  constructor(
    public GAME: GameService,
    public GAME_ROUTES: GameRoutesService,
    public GAME_ACTIONS: GameActionsService,
    public GAME_STORAGE: GameStorageService,
  ) {}

  public opponents() {
    const opponents = [];

    this.GAME_STORAGE.data.players.forEach((player) => {
      if (!player.me && !player.current) {
        opponents.push(player);
      }
    });

    return opponents;
  }
}
