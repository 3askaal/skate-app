import { Component, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Sidebar } from '../components/sidebar/sidebar';

import { PushService } from '../services/push.service';
import { AuthService } from '../services/auth.service';

import { VIEWS } from '../constants/views';
import { ENV } from '../environments/environment';

import * as FastClick from 'fastclick';
import * as SmoothscrollPolyfill from 'smoothscroll-polyfill';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  animations: [
    trigger('sidebar', [
      state(
        'inactive',
        style({
          transform: 'translateX(-100%)',
        }),
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
        }),
      ),
      transition('inactive => active', animate('200ms ease-in-out')),
      transition('active => inactive', animate('200ms ease-in-out')),
    ]),
    trigger('overlay', [
      state(
        'inactive',
        style({
          opacity: '0',
          pointerEvents: 'none',
        }),
      ),
      state(
        'active',
        style({
          opacity: '1',
          pointerEvents: 'auto',
        }),
      ),
      transition('inactive => active', animate('200ms ease-in-out')),
      transition('active => inactive', animate('200ms ease-in-out')),
    ]),
  ],
})
export class App {
  @ViewChild('wrapper') public wrapper;
  sidebarState: string = 'inactive';

  constructor(
    public el: ElementRef,
    public view: ViewContainerRef,
    private PUSH: PushService,
    private AUTH: AuthService,
  ) {
    if (ENV.production) {
      // this.PUSH.initialize();
    }

    this.increasePerformance();
    this.AUTH.checkAuthentication();
    SmoothscrollPolyfill.polyfill();
  }

  increasePerformance() {
    (<any>FastClick).attach(document.body);
  }

  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'active' ? 'inactive' : 'active';
  }
}
