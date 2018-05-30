import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  templateUrl: './rankings.global.html',
})
export class GlobalRankingsPage implements OnInit {
  public users: any = [];
  public sort = '-stats.xp';
  public limitReached: boolean;

  constructor(private DATA: DataService, private SHARED: SharedService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(paginate?: boolean) {
    if (paginate === undefined) {
      paginate = true;
    }

    this.DATA.read(
      {
        collection: 'user',
        paginate: paginate,
      },
      {
        sort: this.sort,
      },
    ).subscribe((res: any) => {
      if (paginate === false) {
        this.users = res;
      } else {
        this.users = this.users.concat(res);
      }
      this.limitReached = this.DATA.loaded.limitReached;
    });
  }
}
