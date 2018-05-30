import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';
import { MatesService } from '../../../services/mates.service';
import { LobbyService } from '../../../services/lobby.service';
import { VIEWS } from '../../../constants/views';

import { ENV } from '../../../environments/environment';

import * as _ from 'lodash';

@Component({
  templateUrl: './tournament.html',
})
export class TournamentPage {
  @ViewChildren('roundEl') private rounds: QueryList<any>;

  public roundIndex = 0;
  public startHeight: number = 10;

  public tournament: any;
  public bracketRounds: any;
  public winner: any;

  constructor(public route: ActivatedRoute, public SHARED: SharedService, public DATA: DataService) {}

  public ngAfterContentInit() {
    this.route.params.subscribe((params) => {
      let tournamentId = params['id'];

      this.DATA.read(
        {
          collection: 'tournament',
          id: tournamentId,
        },
        {
          pop: 'bracket.players',
          popsel: 'username',
        },
      ).subscribe((tournament: any) => {
        this.tournament = tournament[0];
        this.groupRounds();
        this.defineWinner();
      });
    });
  }

  public groupRounds() {
    this.bracketRounds = _.values(_.groupBy(this.tournament.bracket, 'round'));
  }

  public defineWinner() {
    let finalGame = _.last(this.bracketRounds)[0];
    let winnerId = finalGame.winner;
    this.winner = _.find(finalGame.players, { _id: winnerId });
  }

  public getHeight(i) {
    if (!i) {
      i++;
      return `${this.startHeight * i}px`;
    }

    i++;
    i = i * 3.5;
    return `${this.startHeight * i}px`;
  }

  public next() {
    if (this.roundIndex === this.tournament.bracket.length) {
      return;
    }

    this.roundIndex++;

    this.rounds.forEach((round, index) => {
      if (this.roundIndex === index) {
        round.nativeElement.querySelector('div').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  public previous() {
    if (!this.roundIndex) {
      return;
    }

    this.roundIndex--;

    this.rounds.forEach((round, index) => {
      if (this.roundIndex === index) {
        round.nativeElement.querySelector('div').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
