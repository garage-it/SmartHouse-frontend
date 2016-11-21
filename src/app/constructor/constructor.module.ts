import { NgModule } from '@angular/core';

import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';
import { CommonModule } from '@angular/common';

@NgModule({
    id: module.id,
    imports: [ CommonModule, routing ],
    declarations: [
        ConstructorComponent,
        MapConstructorComponent
    ]
})
export class ConstructorModule {}
