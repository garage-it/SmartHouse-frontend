import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialogConfig, MdDialog, MdDialogRef } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm.component';

@Injectable()
export class DialogService {

    constructor(
        private dialog: MdDialog
    ) { }

    confirm(viewContainerRef: ViewContainerRef, options: Object) {
        let dialogRef: MdDialogRef<DialogConfirmComponent>;

        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(DialogConfirmComponent, config);

        Object.assign(dialogRef.componentInstance, options);

        return dialogRef.afterClosed();
    }
}
