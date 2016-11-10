import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ScreenComponent } from './screen/screen.component';

import { AuthService } from './auth/auth.service';
import { GuestGuard, LoggedInGuard } from './profile/profile.guards';
import { ProfileService } from './profile/profile.service';
import { ProfileResolver } from './profile/profile.resolver';
import { ShHttpService } from './sh-http/sh-http.service';
import { StorageService } from './storage/storage.service';

@NgModule({
    id: module.id,
    imports: [ CommonModule, RouterModule, HttpModule],
    declarations: [ HeaderComponent, MainComponent, ScreenComponent ],
    providers: [
        AuthService,
        GuestGuard,
        LoggedInGuard,
        ProfileResolver,
        ProfileService,
        ShHttpService,
        StorageService,
    ],
    exports: [ HeaderComponent, MainComponent, ScreenComponent ]
})
export class CoreModule {}





