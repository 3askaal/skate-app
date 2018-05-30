import { Component } from '@angular/core';

import { VIEWS } from '../../constants/views';
import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';

import { ENV } from '../../environments/environment';

@Component({
  templateUrl: './main.html',
})
export class MainPage {
  pages: any;
  user: any;
  word: any;

  ENV = ENV;

  constructor(public DATA: DataService, public SHARED: SharedService) {
    this.pages = VIEWS.pages;
    this.word = localStorage.getItem('word');
  }

  wordIsBorn(word) {
    localStorage.setItem('word', word);
  }
}
