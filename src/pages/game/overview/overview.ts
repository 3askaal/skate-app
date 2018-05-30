import { Component } from '@angular/core';

import { GameService } from '../../../services/game/game.main.service';
import { GameActionsService } from '../../../services/game/game.actions.service';
import { GameStorageService } from '../../../services/game/game.storage.service';
import { GameRoutesService } from '../../../services/game/game.routes.service';

@Component({
  templateUrl: './overview.html',
})
export class GamePage {
  constructor(
    public GAME: GameService,
    public GAME_ROUTES: GameRoutesService,
    public GAME_ACTIONS: GameActionsService,
    public GAME_STORAGE: GameStorageService,
  ) {}
}
