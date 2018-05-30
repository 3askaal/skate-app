import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Utils } from '../../utils';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { LobbyService } from '../../services/lobby.service';
import { SocketService } from '../../services/socket.service';

import { VIEWS } from '../../constants/views';

@Component({
  templateUrl: './lobby.html',
})
export class LobbyPage {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public SHARED: SharedService,
    public LOBBY: LobbyService,
  ) {
    this.route.params.subscribe((params) => {
      this.LOBBY.join(params['id']);
    });
  }
}
