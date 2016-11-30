import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DialogConfirmComponent } from './dialog/dialog-confirm.component';
import { DialogService } from './dialog/dialog.service';
import { ProtectedComponent } from './components/protected-component/protected.component';

@NgModule({
    id: module.id,
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        ToastModule
    ],
    declarations: [ DialogConfirmComponent, ProtectedComponent ],
    providers: [ DialogService ],
    exports: [ CommonModule, ProtectedComponent ],
    entryComponents: [ DialogConfirmComponent ]
})
export class SharedModule {}
