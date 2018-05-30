import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.html',
})
export class Board {
  @Input() isStatic: boolean;
  @Input() isInput: boolean;
  @Input() letters: number;
  @Input() word: string;

  @Output() boardInput = new EventEmitter();
}
