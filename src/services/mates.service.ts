import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatesService {
  constructor(private DATA: DataService, private SHARED: SharedService) {}

  public getMates(fields?: Array<string>): Observable<any> {
    let popsel: any = ['username'];
    if (fields) {
      popsel = popsel.concat(fields);
    }

    return this.DATA.read(
      {
        collection: 'user',
        id: this.SHARED.user._id,
      },
      {
        sel: 'mates',
        pop: 'mates.mate',
        popsel: popsel,
      },
    ).map(this.processMates);
  }

  private processMates(user): Array<Object> {
    let mates = [];

    user[0].mates.forEach(function(mateObj) {
      let mate = mateObj.mate || {};

      mate.status = mateObj.status;
      mates.push(mate);
    });

    return mates;
  }

  public request(mate): any {
    return this.DATA.update('user/mates/request', {
      user: this.SHARED.user._id,
      mate: mate._id,
    });
  }

  public accept(mate): any {
    return this.DATA.update('user/mates/accept', {
      user: this.SHARED.user._id,
      mate: mate._id,
    });
  }

  public remove(mate): any {
    return this.DATA.update('user/mates/remove', {
      user: this.SHARED.user._id,
      mate: mate._id,
    });
  }
}
