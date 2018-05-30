import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { PushService } from '../../services/push.service';
import { MatesService } from '../../services/mates.service';
import { LobbyService } from '../../services/lobby.service';
import { VIEWS } from '../../constants/views';

import { ENV } from '../../environments/environment';

import * as _ from 'lodash';

// import { Draggable } from '@shopify/draggable';

@Component({
  templateUrl: './invite.html',
})
export class InvitePage {
  public mates: any;

  constructor(
    public router: Router,
    public SHARED: SharedService,
    public MATES: MatesService,
    public DATA: DataService,
    public PUSH: PushService,
    public LOBBY: LobbyService,
  ) {
    this.getMates();
  }

  getMates() {
    this.MATES.getMates().subscribe((data) => {
      this.mates = data;

      this.mates.forEach((mate) => {
        mate.selected = false;
      });
    });
  }

  invite() {
    let players = _.filter(this.mates, 'selected');
    let invites = _.map(players, '_id');

    players.push(this.SHARED.user);
    this.LOBBY.data.players = players;

    // FOR DEMO
    this.LOBBY.data.players[0].active = true;
    this.LOBBY.data.players[1].active = true;
    this.LOBBY.data.players[2].active = true;
    this.router.navigate(['lobby', this.SHARED.user._id]);
    // /FOR DEMO

    // if (ENV.production) {
    //   this.PUSH.send('game:invite', this.SHARED.user._id, invites).subscribe((res) => {
    //     this.router.navigate(['lobby', this.SHARED.user._id]);
    //   });
    // }
  }
}
