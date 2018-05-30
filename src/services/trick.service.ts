import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { DataService } from './data.service';

const CLASSIFICATIONS = {
  1: 'Beginner',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Sick',
  6: 'Insane',
  7: 'Unreal',
  8: 'Godlike',
  9: 'Get outta here',
};

@Injectable()
export class TrickService {
  public tricks: Array<any>;

  private tricksLoaded = new Subject();
  $tricksLoaded = this.tricksLoaded.asObservable();

  constructor(public DATA: DataService) {}

  getTricks() {
    return this.DATA.read(
      {
        collection: 'trick',
      },
      {
        pop: 'essential',
      },
    )
      .map(this.formatAll)
      .map((tricks) => {
        this.tricks = tricks;
      })
      .subscribe((data) => {
        this.tricksLoaded.next();
      });
  }

  format(trick) {
    // remove regular position
    if (trick.position === 'r') {
      trick.position = '';
    }
    if (trick.position === 'f') {
      trick.position = 'fakie';
    }
    if (trick.position === 'n') {
      trick.position = 'nollie';
    }
    if (trick.position === 's') {
      trick.position = 'switch';
    }

    // remove ollie when ...
    if (trick.essential && trick.essential.name === 'ollie') {
      // rotation
      if (trick.rotation) {
        delete trick.essential.name;
      }
      // nollie
      if (trick.position === 'nollie') {
        delete trick.essential.name;
      }
    }

    // define full direction
    // if (trick.direction === 'fs') { trick.direction = 'frontside'; }
    // if (trick.direction === 'bs') { trick.direction = 'backside'; }

    // create string from tags
    if (trick.tags.length) {
      trick.tags = trick.tags.join(', ');
    }

    // define classification by difficulty
    trick.classification = CLASSIFICATIONS[trick.difficulty] || trick.difficulty;

    trick.desc = [
      trick.position ? trick.position : null,
      trick.rotation ? trick.rotation : null,
      trick.direction ? trick.direction : null,
      trick.essential.name ? trick.essential.name : null,
    ].join('');

    return trick;
  }

  formatAll(tricks) {
    tricks.forEach(function(trick) {
      // define positions
      if (trick.position === 'r') {
        trick.position = '';
      }
      if (trick.position === 'f') {
        trick.position = 'fakie';
      }
      if (trick.position === 'n') {
        trick.position = 'nollie';
      }
      if (trick.position === 's') {
        trick.position = 'switch';
      }

      // remove ollie when ...
      if (trick.essential && trick.essential.name === 'ollie') {
        // rotation
        if (trick.rotation) {
          delete trick.essential.name;
        }
        // nollie
        if (trick.position === 'nollie') {
          delete trick.essential.name;
        }
      }

      // define full direction
      if (trick.direction === 'fs') {
        trick.direction = 'frontside';
      }
      if (trick.direction === 'bs') {
        trick.direction = 'backside';
      }

      // create string from tags
      if (trick.tags.length) {
        trick.tags = trick.tags.join(', ');
      }

      // define classification by difficulty
      trick.classification = CLASSIFICATIONS[trick.difficulty] || trick.difficulty;

      // create search string
      trick.desc = [
        trick.position ? trick.position : null,
        trick.rotation ? trick.rotation : null,
        trick.direction ? trick.direction : null,
        trick.essential.name ? trick.essential.name : null,
      ].join('');
    });

    return tricks;
  }

  disableChosen(chosen) {
    let tricks = this.tricks;

    _.forEach(chosen, function(id) {
      let trick: any = _.find(tricks, { _id: id });
      trick.chosen = true;
    });
  }
}
