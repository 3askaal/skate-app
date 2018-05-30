import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { MatesService } from '../../services/mates.service';
import { LobbyService } from '../../services/lobby.service';
import { SharedService } from '../../services/shared.service';
import { VIEWS } from '../../constants/views';

import * as _ from 'lodash';

@Component({
  templateUrl: './mates.html',
})
export class MatesPage {
  public searchValue: string;
  public results: any;
  public resultExceptions: any;

  public mates: any;
  public requests: any;
  public requested: any;

  public focussed: boolean;

  constructor(
    public router: Router,
    public DATA: DataService,
    public MATES: MatesService,
    public SHARED: SharedService,
  ) {
    this.getMates();
  }

  private getMates() {
    this.MATES.getMates().subscribe((data) => {
      this.resultExceptions = _.map(data, '_id');
      this.resultExceptions.push(this.SHARED.user._id);

      this.mates = _.filter(data, { status: 0 }) || null;
      this.requests = _.filter(data, { status: 1 }) || null;
      this.requested = _.filter(data, { status: 2 }) || null;
    });
  }

  public onInput(searchValue) {
    this.searchValue = searchValue;
    this.searchMates();
  }

  public searchMates() {
    this.DATA.read(
      {
        collection: 'user',
      },
      {
        find: { username: { $regex: this.searchValue, $options: 'i' } },
        sel: 'username',
      },
    ).subscribe((res) => this.processResults(res));
  }

  private processResults(res) {
    if (res.length) {
      this.results = res;
      this.filterResults();
    } else {
      this.results = null;
    }
  }

  private filterResults() {
    let self = this;

    this.results.forEach(function(result) {
      if (_.includes(self.resultExceptions, result._id)) {
        _.pull(self.results, result);
      }
    });
  }

  public challenge(mate) {
    this.router.navigate(['lobby', mate._id]);
  }

  public request(mate) {
    this.MATES.request(mate).subscribe((data) => {
      this.getMates();
      this.results = null;
    });
  }

  public accept(mate) {
    this.MATES.accept(mate).subscribe((data) => {
      this.getMates();
    });
  }

  public remove(mate) {
    this.MATES.remove(mate).subscribe((data) => {
      this.getMates();
    });
  }
}
