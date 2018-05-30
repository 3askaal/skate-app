import { Component } from '@angular/core';
import { MatesService } from '../../../services/mates.service';

@Component({
  templateUrl: './rankings.mates.html',
})
export class MatesRankingsPage {
  public mates: any;
  public sort = '-stats.xp';

  constructor(public MATES: MatesService) {
    this.getMates();
  }

  getMates() {
    this.MATES.getMates(['stats']).subscribe((data) => {
      this.mates = data;
    });
  }
}
