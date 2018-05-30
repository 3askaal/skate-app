import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Nes from 'nes';

import { AuthService } from './auth.service';
import { ENV } from '../environments/environment';

@Injectable()
export class SocketService {
  public client: any;

  constructor(private AUTH: AuthService) {}

  public connect() {
    if (this.client) {
      this.client = null;
    }

    this.client = new Nes.Client(ENV.CONF.API.WS_URL);

    return new Observable((observer) => {
      let token = this.AUTH.getToken();

      let options = {
        auth: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      };

      this.client.connect(
        options,
        this.onError,
      );

      this.client.onConnect = function() {
        observer.next();
      };

      this.client.onUpdate = function(data) {
        observer.next(data);
      };
    });
  }

  public request(path, payload?) {
    function handler(err, data) {
      if (err) {
        console.log(err);
      }
    }

    this.client.request(
      {
        path: path,
        payload: payload,
        method: payload ? 'POST' : 'GET',
      },
      handler,
    );
  }

  public sub(path) {
    return new Observable((observer) => {
      function handler(update) {
        observer.next(update);
      }

      this.client.subscribe(path, handler, this.onError);
    });
  }

  private onError(err) {
    if (err) {
      console.log(err);
    }
  }

  public disconnect() {
    this.client = null;
  }
}
