import { Injectable, ViewChild, ComponentRef, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

import { Dialog } from '../components/dialog/dialog';

import * as _ from 'lodash';

@Injectable()
export class DialogService {
  public dialog: ComponentRef<Dialog>;

  constructor(private App: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver) {}

  public inject() {
    this.close();
    let factory = this.componentFactoryResolver.resolveComponentFactory(Dialog);
    this.dialog = this.App.components[0].instance.view.createComponent(factory);
  }

  public show(content) {
    this.inject();
    if (content.form) {
      this.form(content.form);
    }
  }

  public form(form) {}

  public close() {
    if (this.dialog) {
      this.dialog.destroy();
    }
  }
}
