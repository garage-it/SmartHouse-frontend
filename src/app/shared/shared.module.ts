import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ShHttpService } from './sh-http/sh-http.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage/storage.service';
import { ProfileService } from './profile/profile.service';

@NgModule({
    id: module.id,
    imports: [ CommonModule, HttpModule ],
    providers: [
        AuthService, ProfileService, ShHttpService, StorageService,
    ],
    exports: [ CommonModule ]
})
export class SharedModule {}
