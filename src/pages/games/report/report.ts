import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as _ from 'lodash';
import * as Color from 'color';
import * as RandomColor from 'random-color';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';
import { SocketService } from '../../../services/socket.service';

import { Utils } from '../../../utils';

@Component({
  templateUrl: './report.html',
})
export class ReportPage {
  report: any;
  players: any;
  turns: any;
  word: any;

  chartOptions: any;
  chartLabels: any;
  chartColors: any;
  xpChartData: any;
  letterChartData: any;
  trickStanceChartData: any;
  trickTypeChartData: any;

  constructor(public route: ActivatedRoute, public SHARED: SharedService, public DATA: DataService) {}

  public ngAfterContentInit() {
    this.route.params.subscribe((params) => {
      let gameId = params['id'];

      this.DATA.read({
        collection: 'game',
        id: gameId,
      }).subscribe((game: any) => {
        this.players = Utils.playerObjFix(game.players);
        this.turns = game.turns;
        this.word = game.word;
        this.setColors();
        this.setupCharts();
      });
    });
  }

  getRandomColor(index) {
    let primary = '#04F2D5';
    let secondary = '#7459DC';
    let mixables = [primary, secondary];

    let randomColor = RandomColor(0.6, 0.6);
    let color = Color(randomColor);

    let mixColor;

    if (index % 2) {
      mixColor = primary;
    } else {
      mixColor = secondary;
    }

    color = color.lighten(0.6);
    color = color.mix(Color(mixColor), 0.5);
    color = color.clearer(0.4);

    return color.rgbString();
  }

  setColors() {
    const dis = this;

    _.forEach(this.players, function(player, index: any) {
      player.backgroundColor = dis.getRandomColor(index);
      player.borderColor = 'rgba(0,0,0,0)';
    });
  }

  async setupCharts() {
    this.chartLabels = _.map(this.players, 'username');
    this.chartColors = [
      {
        backgroundColor: _.map(this.players, 'backgroundColor'),
        borderColor: _.map(this.players, 'borderColor'),
      },
    ];

    this.xpChartData = _.map(this.players, 'report.xp');
    this.letterChartData = _.map(this.players, 'report.lettersGiven');

    const tricks = _.map(this.turns, 'trick');

    this.trickStanceChartData = {
      labels: ['regular', 'nollie', 'switch', 'fakie'],
      values: [
        _.filter(tricks, { position: 'r' }).length,
        _.filter(tricks, { position: 'n' }).length,
        _.filter(tricks, { position: 's' }).length,
        _.filter(tricks, { position: 'f' }).length,
      ],
      colors: [
        {
          backgroundColor: [
            this.getRandomColor(1),
            this.getRandomColor(2),
            this.getRandomColor(3),
            this.getRandomColor(4),
          ],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
        },
      ],
    };

    this.trickTypeChartData = {
      labels: ['rotation', 'flips', 'shove-its'],
      values: [
        _.map(tricks, (o: any) => {
          if (!_.includes(o.desc, 'flip') && !_.includes(o.desc, 'shove')) {
            return o;
          }
        }).length,
        _.map(tricks, (o: any) => {
          if (_.includes(o.desc, 'shove')) {
            return o;
          }
        }).length,
        _.map(tricks, (o: any) => {
          if (_.includes(o.desc, 'flip')) {
            return o;
          }
        }).length,
      ],
      colors: [
        {
          backgroundColor: [this.getRandomColor(1), this.getRandomColor(2), this.getRandomColor(3)],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
        },
      ],
    };
  }
}
