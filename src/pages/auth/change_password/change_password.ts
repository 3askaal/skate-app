import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  templateUrl: './change_password.html',
})
export class ChangePasswordPage {
  public passwords: any = {};

  constructor(public AUTH: AuthService, public SHARED: SharedService) {}
}
