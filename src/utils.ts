import { SharedService } from './services/shared.service';

import * as _ from 'lodash';

export class Utils {
  public static filterTrue(array, key) {
    return array.every((obj) => {
      return obj[key] === true;
    });
  }

  public static filter(collection, filterBy) {
    return _.filter(collection, [filterBy, true]);
  }

  public static filterMap(collection, filterBy, map) {
    return _.map(_.filter(collection, [filterBy, true]), map);
  }

  public static playerObjFix(players) {
    return _.forEach(players, (player) => {
      _.merge(player, player.player);
      _.remove(player, 'player');
    });
  }

  public static formatGame(game) {
    game.players.forEach((player) => {
      this.replaceValues(game, player.player._id, player.player.username);
    });

    return game;
  }

  public static replaceValues(obj, query, replace) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object') {
        this.replaceValues(value, query, replace);
      }

      if (value === query) {
        value = replace;
      }
    }
  }
}
