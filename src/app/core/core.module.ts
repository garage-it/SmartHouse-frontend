import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import { HeaderComponent } from './header/header.component';
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

@NgModule({
    id: module.id,
    imports: [ CommonModule, RouterModule, HttpModule, SharedModule ],
    declarations: [
        HeaderComponent,
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
