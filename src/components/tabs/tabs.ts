import {
  Component,
  ViewChild,
  ContentChildren,
  QueryList,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  AfterContentInit,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Tab } from './tab';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.html',
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
export class Tabs implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  tab: ComponentRef<Component>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);

    if (!activeTabs.length) {
      this.select(this.tabs.first);
    } else {
      this.select(activeTabs[0]);
    }
  }

  select(selectedTab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });

    if (selectedTab.root) {
      this.renderComponent(selectedTab.root);
    }

    selectedTab.activate();
  }

  renderComponent(component) {
    if (this.tab) {
      this.tab.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.tab = this.container.createComponent(factory);
  }
}
