import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './dialog-confirm.html',
    selector: 'dialog-confirm'
})
export class DialogConfirmComponent {
    public title: string = 'Confirm';
    public message: string = 'Are you sure?';
    public ok: string = 'Ok';
    public cancel: string = 'Cancel';

    constructor(private dialogRef: MdDialogRef<any>) {
    }

    confirm() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close();
    }
}
