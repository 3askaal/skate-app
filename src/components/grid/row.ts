import { Component, Input } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './row.html',
})
export class Row {
  @Input() isStatic: boolean;
  @Input() letters: number;
  @Input() word: Array<string>;
  @Input() gutters: boolean;
  @Input() bigGutters: boolean;
}
