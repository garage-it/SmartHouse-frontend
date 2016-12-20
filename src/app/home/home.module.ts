import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';

import { HomeComponent } from './home.component';

import HOME_DECLARATIONS from './home.declarations';
import { MapViewService } from './map-view/map-view.service';
import { CoreModule } from '../core/core.module';
import { ChartModule } from 'angular2-highcharts';
import { HomeService } from './home.service';
import { HomeResolveService } from './home-resolve.service';
import { DevicesModule } from '../shared/devices/devices.module';
import { ViewService } from './view/view.service';

@NgModule({
    id: module.id,
    imports: [
        CoreModule,
        SharedModule,
        DevicesModule,
        RouterModule,
        FormsModule,
        routing,
        ChartModule
    ],
    declarations: [ ...HOME_DECLARATIONS ],
    exports: [ HomeComponent ],
    providers: [
        MapViewService,
        HomeService,
        HomeResolveService,
        ViewService
    ]
})
export class HomeModule {}
