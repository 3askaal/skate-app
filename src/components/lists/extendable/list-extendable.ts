import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'list-extendable',
  templateUrl: './list-extendable.html',
  animations: [
    trigger('extendable', [
      state(
        'inactive',
        style({
          maxHeight: '0',
        }),
      ),
      state(
        'active',
        style({
          maxHeight: '150px',
        }),
      ),
      transition('inactive => active', animate('200ms ease-in-out')),
      transition('active => inactive', animate('200ms ease-in-out')),
    ]),
  ],
})
export class ListExtendable {
  @Input() extend: boolean = false;
  @Input() extendableState: string = 'inactive';

  ngOnChanges() {
    if (this.extend) {
      this.extendableState = 'active';
    } else {
      this.extendableState = 'inactive';
    }
  }
}
