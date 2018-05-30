import { Component, Input, ApplicationRef } from '@angular/core';

import { App } from '../../app/app.component';

@Component({
  selector: 'header',
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string;

  canGoBack: boolean;

  constructor(public App: App) {}

  toggleSidebar() {
    this.App.toggleSidebar();
  }
}
