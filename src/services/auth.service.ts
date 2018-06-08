import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

import { SharedService } from './shared.service';
import { DataService } from './data.service';

import { ENV } from '../environments/environment';

@Injectable()
export class AuthService {
  private authenticated: boolean;
  public options: any;

  constructor(private router: Router, private http: Http, private SHARED: SharedService) {
    this.authenticated = !!localStorage.getItem('token');
  }

  public login(credentials: any): Subscription {
    return this.http
      .post(`${ENV.CONF.API.URL}/user/login`, credentials, this.options)
      .map((res) => res.json())
      .subscribe((data) => this.handleLogin(data), (err) => this.handleError(err));
  }

  public register(credentials: any): Subscription {
    return this.http
      .post(`${ENV.CONF.API.URL}/user/register`, credentials, this.options)
      .map((res) => res.json())
      .subscribe((data) => this.handleRegister(data), (err) => this.handleError(err));
  }

  public changePassword(passwords) {
    return this.http
      .post(`${ENV.CONF.API.URL}/user/password/change`, passwords)
      .map((res) => res.json())
      .subscribe((data) => console.log(data), (err) => this.handleError(err));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authenticated = false;
    this.router.navigate(['login']);
  }

  private handleLogin(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.onAuthenticatedUser();
    this.router.navigate(['']);
  }

  private handleRegister(data) {
    this.router.navigate(['login']);
  }

  private onAuthenticatedUser() {
    this.setAuthenticatedUser();
    this.setHeaders();

    // if (ENV.production) {
    //   this.storeDeviceToken();
    // }
  }

  public checkAuthentication() {
    if (this.authenticated) {
      this.router.navigate(['']);
      this.onAuthenticatedUser();
    } else {
      this.router.navigate(['login']);
    }
  }

  private setAuthenticatedUser() {
    let user = this.getUser();
    this.SHARED.user = user;
  }

  private setHeaders() {
    let token = this.getToken();

    let headers = new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.options = new RequestOptions({ headers: headers });
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public storeDeviceToken() {
    let device = localStorage.getItem('device');

    this.http
      .put(`${ENV.CONF.API.URL}/user/${this.SHARED.user._id}`, {
        device: device,
      })
      .map((res) => res.json())
      .subscribe((data) => {}, (err) => {});
  }

  private handleError(error: any) {
    console.log('ERROR', error);
  }
}
