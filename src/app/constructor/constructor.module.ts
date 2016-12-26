import { NgModule } from '@angular/core';
import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { DashboardConstructorComponent } from './dashboard/dashboard-constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DevicesModule } from '../devices/devices.module';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { DevicesComponent } from './devices/devices.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CanDeactivateConstructor } from './can-deactivate-constructor';
import { OptionsComponent } from './options/options.component';
import { ViewResolveService } from './view-resolve.service';
import { ConstructorService } from './constructor.service';

@NgModule({
    id: module.id,
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        DevicesModule,
        DragulaModule,
        routing
    ],
    declarations: [
        ConstructorComponent,
        DashboardConstructorComponent,
        MapConstructorComponent,
        SensorsListComponent,
        FileDropDirective,
        FileSelectDirective,
        DevicesComponent,
        OptionsComponent
    ],
    providers: [
        CanDeactivateConstructor,
        ViewResolveService,
        ConstructorService
    ]
})
export class ConstructorModule {}
