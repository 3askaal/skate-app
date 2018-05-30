import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';

import { VIEWS } from '../../constants/views';

import * as _ from 'lodash';

@Component({
  templateUrl: './games.html',
})
export class GamesPage {
  games: any = [];
  limit = 10;
  skip = 0;

  constructor(public DATA: DataService, public SHARED: SharedService) {
    this.getGames();
  }

  getGames() {
    this.DATA.read(
      {
        collection: 'game',
      },
      {
        find: { 'players.player': this.SHARED.user._id, status: 'over' },
        sort: '-updatedAt',
        pop: 'players.player',
        popsel: 'username',
        limit: this.limit,
        skip: this.skip,
      },
    ).subscribe((res) => {
      this.games = _.concat(this.games, res);
      this.skip = this.skip + this.limit;
    });
  }
}
