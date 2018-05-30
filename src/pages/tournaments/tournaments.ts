import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';

import { VIEWS } from '../../constants/views';

import * as _ from 'lodash';

@Component({
  templateUrl: './tournaments.html',
})
export class TournamentsPage {
  tournaments: any = [];
  limit = 10;
  skip = 0;

  constructor(public DATA: DataService, public SHARED: SharedService) {
    this.getTournaments();
  }

  getTournaments() {
    this.DATA.read(
      {
        collection: 'tournament',
      },
      {
        find: { players: this.SHARED.user._id },
        sort: '-updatedAt',
        limit: this.limit,
        skip: this.skip,
      },
    ).subscribe((res) => {
      this.tournaments = _.concat(this.tournaments, res);
      this.skip = this.skip + this.limit;
    });
  }
}
