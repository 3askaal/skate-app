import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'tab',
  templateUrl: './tab.html',
  animations: [
    trigger('trigger', [
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ),
      state(
        'inactive',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
    ]),
  ],
})
export class Tab {
  @Input() title: string;
  @Input() active = false;
  @Input() root;

  @Output() onActivate = new EventEmitter();

  public activate() {
    this.active = true;
    this.onActivate.emit(this.title);
  }
}
