import { Component, Input, ElementRef, AfterContentInit } from '@angular/core';

import { Row } from './row';

@Component({
  selector: 'column',
  templateUrl: './col.html',
})
export class Col implements AfterContentInit {
  @Input() width: any;

  private gutters: string = '5px';

  constructor(private elementRef: ElementRef, private row: Row) {}

  ngAfterContentInit() {
    if (this.row.bigGutters) {
      this.gutters = '10px';
    }

    this.elementRef.nativeElement.style.flexBasis = `calc(${this.width}% - ${this.gutters})`;
    this.elementRef.nativeElement.style.marginLeft = this.gutters;
    this.elementRef.nativeElement.style.marginRight = this.gutters;
  }
}
