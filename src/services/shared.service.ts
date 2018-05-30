import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable()
export class SharedService {
  user: User;
}
