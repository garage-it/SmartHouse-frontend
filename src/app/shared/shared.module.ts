import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { DialogConfirmComponent } from './dialog/dialog-confirm.component';
import { DialogService } from './dialog/dialog.service';

@NgModule({
    id: module.id,
    imports: [
        CommonModule,
        MaterialModule.forRoot()
    ],
    declarations: [ DialogConfirmComponent ],
    providers: [ DialogService ],
    exports: [ CommonModule ],
    entryComponents: [ DialogConfirmComponent ]
})
export class SharedModule {}
