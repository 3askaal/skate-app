import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as qs from 'qs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';

import { ENV } from '../environments/environment';

interface requestOptions {
  collection: string;
  id?: string;
  data?: any;
  paginate?: boolean;
}

interface requestQuery {
  find?: object;
}

@Injectable()
export class DataService {
  constructor(private http: Http, private AUTH: AuthService) {}

  private limit: number = 100;

  public loaded: any = {
    path: null,
    amount: 0,
    limitReached: false,
  };

  public create(path: any, data: any): Observable<Response> {
    return this.http
      .post(`${ENV.CONF.API.URL}/${path}`, data, this.AUTH.options)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public read(options: requestOptions, query?: any): Observable<Response> {
    const URL = this.createUrl(options);

    query = query || {};
    query.limit = this.limit;

    if (options.paginate) {
      query.skip = this.loaded.amount;
    }

    this.AUTH.options.search = qs.stringify(query, {
      indices: false,
      encode: false,
    });

    return this.http
      .get(URL, this.AUTH.options)
      .map((res: any) => {
        let data = this.handleSuccess(res);
        this.handlePagination(options.paginate, data.length);
        return data;
      })
      .catch(this.handleError);
  }

  public update(path: any, data?: any): Observable<Response> {
    return this.http
      .put(`${ENV.CONF.API.URL}/${path}`, data, this.AUTH.options)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public delete(path: any, id: any): Observable<Response> {
    return this.http
      .delete(`${ENV.CONF.API.URL}/${path}/${id}`, this.AUTH.options)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public createUrl(options: requestOptions) {
    if (options.id) {
      return `${ENV.CONF.API.URL}/${options.collection}/${options.id}`;
    } else {
      return `${ENV.CONF.API.URL}/${options.collection}`;
    }
  }

  private handlePagination(paginate, amount) {
    if (paginate) {
      this.loaded.amount += amount;

      if (amount < this.limit) {
        this.loaded.limitReached = true;
      }
    } else {
      this.loaded.amount = 0;
      this.loaded.limitReached = false;
    }
  }

  private handleSuccess(res: Response) {
    return res.json() || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
