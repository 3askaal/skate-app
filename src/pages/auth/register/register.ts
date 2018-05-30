import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  templateUrl: './register.html',
})
export class RegisterPage {
  public credentials: any;

  constructor(public AUTH: AuthService, public SHARED: SharedService) {}
}
