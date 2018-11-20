import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  templateUrl: './login.html',
})
export class LoginPage {
  public credentials: any = {
    identifier: 'demo',
    password: 'demo'
  };

  constructor(public AUTH: AuthService, public SHARED: SharedService) {}
}
