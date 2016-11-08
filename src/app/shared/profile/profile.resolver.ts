import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<null> {
  constructor(private profile: ProfileService) {}

  resolve() {
    return this.profile.retrieve()
        .map(() => {
            this.resolve = () => null;
        });
  }
}
