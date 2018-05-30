import { Component } from '@angular/core';

import { GlobalRankingsPage } from './global/rankings.global';
import { MatesRankingsPage } from './mates/rankings.mates';

@Component({
  templateUrl: './rankings.html',
})
export class RankingsPage {
  GlobalRankingsTab: any = GlobalRankingsPage;
  MatesRankingsTab: any = MatesRankingsPage;
}
