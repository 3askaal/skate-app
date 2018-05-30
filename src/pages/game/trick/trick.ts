import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { TrickService } from '../../../services/trick.service';
import { GameService } from '../../../services/game/game.main.service';
import { GameActionsService } from '../../../services/game/game.actions.service';
import { GameStorageService } from '../../../services/game/game.storage.service';
import { GameRoutesService } from '../../../services/game/game.routes.service';

@Component({
  templateUrl: './trick.html',
})
export class TrickPage {
  public trick: any;
  public keywords: any;

  constructor(
    public TRICK: TrickService,
    public GAME: GameService,
    public GAME_ROUTES: GameRoutesService,
    public GAME_ACTIONS: GameActionsService,
    public GAME_STORAGE: GameStorageService,
  ) {}

  onInput(searchValue) {
    this.keywords = searchValue.split(' ');
  }

  onClear() {
    this.deselect();
    this.keywords = [];
  }

  select(trick) {
    this.deselect();
    this.trick = trick;
    this.trick.selected = true;
  }

  deselect() {
    let previous = _.find(this.TRICK.tricks, 'selected');
    if (previous) {
      delete previous.selected;
    }
    this.trick = null;
  }
}
