import { NgModule } from '@angular/core';

import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { DashboardConstructorComponent } from './dashboard/dashboard-constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';

@NgModule({
    id: module.id,
    imports: [ routing ],
    declarations: [
        ConstructorComponent,
        DashboardConstructorComponent,
        MapConstructorComponent
    ]
})
export class ConstructorModule {}
