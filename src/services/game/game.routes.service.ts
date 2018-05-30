import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
import { SharedService } from '../shared.service';
import { GameActionsService } from './game.actions.service';
import { GameStorageService } from './game.storage.service';
import { GameListenersService } from './game.listeners.service';
import * as _ from 'lodash';

@Injectable()
export class GameRoutesService {
  constructor(private router: Router, private SHARED: SharedService, private GAME_STORAGE: GameStorageService) {}

  public route(event) {
    switch (event) {
      case 'data:ready':
        if (this.GAME_STORAGE.data.ref) {
          if (this.GAME_STORAGE.isRef) {
            this.router.navigate(['game', this.GAME_STORAGE.id, 'trick']);
          } else {
            this.router.navigate(['']);
          }
        } else {
          if (this.GAME_STORAGE.isCurrent) {
            this.router.navigate(['game', this.GAME_STORAGE.id, 'trick']);
          } else {
            this.router.navigate(['game', this.GAME_STORAGE.id]);
          }
        }
        break;

      case 'next:player':
        if (this.GAME_STORAGE.isCurrent || this.GAME_STORAGE.isRef) {
          this.router.navigate(['game', this.GAME_STORAGE.id, 'trick']);
        } else {
          this.router.navigate(['game', this.GAME_STORAGE.id]);
        }
        break;

      case 'trick:chosen':
        this.router.navigate(['game', this.GAME_STORAGE.id, 'defense']);
        break;

      case 'defense:applied':
        if (this.GAME_STORAGE.isCurrent || this.GAME_STORAGE.isRef) {
          this.router.navigate(['game', this.GAME_STORAGE.id, 'trick']);
        } else {
          this.router.navigate(['game', this.GAME_STORAGE.id]);
        }
        break;

      case 'game:over':
        this.router.navigate(['games/report', this.GAME_STORAGE.id]);
        break;

      case 'switch:overview':
        this.router.navigate(['game', this.GAME_STORAGE.id]);
        break;

      case 'switch:trick':
        this.router.navigate(['game', this.GAME_STORAGE.id, 'trick']);
        break;
    }
  }
}
