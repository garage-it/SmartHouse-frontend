import { NgModule } from '@angular/core';

import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { DashboardConstructorComponent } from './dashboard/dashboard-constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { DashboardResolveService } from '../core/dashboard/dashboard-resolve.service';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { WidgetComponent } from './dashboard/dashboard-view/widget/widget.component';

@NgModule({
    id: module.id,
    imports: [ CommonModule, routing ],
    declarations: [
        ConstructorComponent,
        DashboardConstructorComponent,
        MapConstructorComponent,
        WidgetListComponent,
        DashboardViewComponent,
        WidgetComponent
    ],
    providers: [
        DashboardResolveService
    ]
})
export class ConstructorModule {}
