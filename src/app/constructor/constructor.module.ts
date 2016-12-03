import { NgModule } from '@angular/core';
import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { DashboardConstructorComponent } from './dashboard/dashboard-constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { DashboardResolveService } from '../dashboard/dashboard-resolve.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceListModule } from '../devices/device-list/device-list.module';
import { DashboardViewResolveService } from './dashboard/dashboard-view/dashboard-view-resolve.service';
import { DashboardConstructorService } from './dashboard/dashboard-constructor.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { DevicesComponent } from './devices/devices.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CanDeactivateConstructor } from './can-deactivate-constructor';

@NgModule({
    id: module.id,
    imports: [ SharedModule, CommonModule, FormsModule, routing, DeviceListModule, DashboardModule, DragulaModule ],
    declarations: [
        ConstructorComponent,
        DashboardConstructorComponent,
        MapConstructorComponent,
        SensorsListComponent,
        DashboardViewComponent,
        FileDropDirective,
        FileSelectDirective,
        DevicesComponent
    ],
    providers: [
        DashboardResolveService,
        DashboardConstructorService,
        DashboardViewResolveService,
        CanDeactivateConstructor
    ]
})
export class ConstructorModule {}
