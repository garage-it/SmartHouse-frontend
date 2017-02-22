import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './header/user/user.component';
import { MainComponent } from './main/main.component';
import { ScreenComponent } from './screen/screen.component';

import { AuthService } from './auth/auth.service';
import { GuestGuard, LoggedInGuard } from './profile/profile.guards';
import { ProfileService } from './profile/profile.service';
import { ProfileResolver } from './profile/profile.resolver';
import { ShHttpService } from './sh-http/sh-http.service';
import { ShHttpUtilsService } from './sh-http/sh-http-utils.service';
import { StorageService } from './storage/storage.service';
import { ShRequestOptions } from './sh-http/sh-request-options';
import { FilesService } from './files/files.service';
import { WindowRef } from './browser/window-ref.service';
import { TimepieceComponent } from './header/timepiece/timepiece.component';
import { SharedModule } from '../shared/shared.module';
import { MdMenuModule } from '@angular/material';

@NgModule({
    id: module.id,
    imports: [ CommonModule, RouterModule, HttpModule, SharedModule, MdMenuModule ],
    declarations: [
        HeaderComponent,
        UserComponent,
        MainComponent,
        ScreenComponent,
        TimepieceComponent
    ],
    providers: [
        AuthService,
        GuestGuard,
        LoggedInGuard,
        ProfileResolver,
        ProfileService,
        ShHttpService,
        { provide: RequestOptions, useClass: ShRequestOptions },
        ShHttpUtilsService,
        StorageService,
        WindowRef,
        FilesService
    ],
    exports: [ HeaderComponent, MainComponent, ScreenComponent, TimepieceComponent ]
})
export class CoreModule {}
