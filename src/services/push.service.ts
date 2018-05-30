import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

import { ENV } from '../environments/environment';

@Injectable()
export class PushService {
  private push: any;
  public deviceToken: string;

  constructor(
    private SHARED: SharedService,
    private DATA: DataService,
    private AUTH: AuthService,
    private router: Router,
  ) {}

  public initialize() {
    this.push = (<any>window).PushNotification.init({
      android: {
        senderID: ENV.CONF.KEYS.GCM,
      },
    });

    this.push.on('registration', this.onRegistration.bind(this));
    this.push.on('notification', this.onNotification.bind(this));
    this.push.on('error', this.onError.bind(this));
  }

  public send(type, sender, users) {
    return this.DATA.create('push', {
      type: type,
      sender: sender,
      users: users,
    });
  }

  private onRegistration(data) {
    this.deviceToken = data.registrationId;
    localStorage.setItem('device', this.deviceToken);
  }

  private onNotification(message) {
    let data = message.additionalData;

    if (data.lobby) {
      this.router.navigate(['lobby', data.lobby]);
    }

    if (data.redirect) {
      this.router.navigate([data.redirect]);
    }
  }

  private onError(err) {
    alert('onError');
    alert(err.toString());
    alert(err.message);
  }
}
