import { Component, Input, AfterContentInit } from '@angular/core';

import { TrickService } from '../../services/trick.service';

@Component({
  selector: 'trick',
  templateUrl: './trick.html',
})
export class Trick implements AfterContentInit {
  @Input() trick: any;
  @Input() full = true;

  constructor(private TRICK: TrickService) {}

  ngAfterContentInit() {
    this.trick = this.TRICK.format(this.trick);
  }
}
