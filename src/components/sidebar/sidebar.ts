import { Component, Input, ElementRef } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { GameActionsService } from 'services/game/game.actions.service';
import { GameStorageService } from 'services/game/game.storage.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(
    public AUTH: AuthService,
    public GAME_ACTIONS: GameActionsService,
    public GAME_STORAGE: GameStorageService,
  ) {}
}
