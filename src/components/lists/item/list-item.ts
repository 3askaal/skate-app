import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.html',
})
export class ListItem {
  @Input() icon: any;
  @Input() buttons: any;

  @Output() onExtend = new EventEmitter();

  @Output() onRequest = new EventEmitter();
  @Output() onAccept = new EventEmitter();
  @Output() onChallenge = new EventEmitter();
  @Output() onRemove = new EventEmitter();
}
