import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Utils } from '../../utils';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { LobbyService } from '../../services/lobby.service';
import { SocketService } from '../../services/socket.service';

import { Dialog } from '../../components/dialog/dialog';

import { VIEWS } from '../../constants/views';

@Component({
  templateUrl: './admin.html',
})
export class AdminPage {
  public data: any;
  public selectedItem: any;

  @ViewChild(Dialog) dialog: Dialog;

  constructor(private DIALOG: DialogService, private DATA: DataService) {}

  getData(path) {
    this.DATA.read(path, {
      sort: '-stats.xp',
    }).subscribe((res: any) => {
      this.data = res;
    });
  }
}
