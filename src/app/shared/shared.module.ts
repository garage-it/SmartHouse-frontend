import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ShHttpService } from './sh-http/sh-http.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage/storage.service';
import { ProfileService } from './profile/profile.service';
import { GuestGuard, LoggedInGuard } from './profile/profile.guards';
import { ProfileResolver } from './profile/profile.resolver';

@NgModule({
    id: module.id,
    imports: [ CommonModule, HttpModule ],
    providers: [
        AuthService, ProfileService, ShHttpService, StorageService,
        ProfileResolver, GuestGuard, LoggedInGuard
    ],
    exports: [ CommonModule ]
})
export class SharedModule {}
