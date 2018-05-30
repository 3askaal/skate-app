import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'letters',
  templateUrl: './letters.html',
})
export class Letters {
  length: 10;
  fontSize: string;

  @Input() isStatic: boolean;
  @Input() isInput: boolean;

  @Input() letters: number;
  @Input() word: string;

  @Output() wordInput = new EventEmitter();

  ngDoCheck() {
    this.calcFontSize();
  }

  ngOnInit() {
    if (!this.word) {
      this.word = 'skate';
    }
  }

  onInput() {
    this.wordInput.emit(this.word);
    this.calcFontSize();
  }

  onBlur() {
    this.word = this.word || 'skate';
    this.calcFontSize();
  }

  calcFontSize() {
    let value = (10 - this.word.length) / 10;
    this.fontSize = 2.5 + value + 'em';
  }

  animateLetters() {
    let chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
    ];

    this.word.split('').forEach((letter, index) => {
      let letterChars = _.sampleSize(chars, 10);

      letterChars.forEach((char) => {
        setTimeout(() => {
          this.word = this.word.substring(0, index) + char + this.word.substring(index + 1);
        }, 1000);
      });
    });
  }
}
