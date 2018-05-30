import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trickFilter',
  pure: false,
})
export class TrickPipe implements PipeTransform {
  transform(items: Array<any>, keywords: Array<string>): Array<any> {
    return items.filter((item) => {
      if (keywords && keywords.length) {
        if (this.checkValues(item.desc, keywords)) {
          return true;
        }
      } else if (item.fav) {
        return true;
      } else {
        return false;
      }
    });
  }

  checkValues(desc, keywords) {
    return keywords.every(function(keyword) {
      return desc.indexOf(keyword) > -1;
    });
  }
}
