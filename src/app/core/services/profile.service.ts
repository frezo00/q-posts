import { Injectable } from '@angular/core';
import { Profile } from '@shared/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProfileService {
  private _profile: Profile = {
    name: 'Frano Rezo',
    email: 'frano.rezo@q.com'
  };

  getProfile$(): Observable<Profile> {
    return of(this._profile);
  }
}
