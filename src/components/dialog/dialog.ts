import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.html',
})
export class Dialog {
  @Input() title: string;
  @Input() message: string;
  @Input() buttons: any;

  @Output() buttonClick = new EventEmitter();
}
