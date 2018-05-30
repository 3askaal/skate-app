import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'order',
  pure: false,
})
export class OrderPipe implements PipeTransform {
  transform(items: Array<Object>, props: Array<string>): Array<any> {
    let directions = [];
    let fields = [];

    _.forEach(props, function(prop) {
      if (_.startsWith(prop, '-')) {
        directions.push('desc');
        prop = prop.replace('-', '');
      } else {
        directions.push('asc');
      }

      fields.push(prop);
    });

    return _.orderBy(items, fields, directions);
  }
}
