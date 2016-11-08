import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { ShHttpService } from './sh-http/sh-http.service';
import { DialogConfirmComponent } from './dialog/dialog-confirm.component';
import { DialogService } from './dialog/dialog.service';

@NgModule({
    id: module.id,
    imports: [
        CommonModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    declarations: [ DialogConfirmComponent ],
    providers: [ ShHttpService, DialogService ],
    exports: [ CommonModule ],
    entryComponents: [ DialogConfirmComponent ]
})
export class SharedModule {}
