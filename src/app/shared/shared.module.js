import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ShHttpService } from './sh-http/sh-http.service';
import { ShRequestOptions } from './sh-http/sh-request-options';

@NgModule({
    module: module.id,
    imports: [ CommonModule, HttpModule ],
    providers: [ ShHttpService, ShRequestOptions ],
    exports: [ CommonModule ]
})
export class SharedModule {}
