import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ShHttpService } from './sh-http/sh-http.service';

@NgModule({
    id: module.id,
    imports: [ CommonModule, HttpModule ],
    providers: [ ShHttpService ],
    exports: [ CommonModule ]
})
export class SharedModule {}
