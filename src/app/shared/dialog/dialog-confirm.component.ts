import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
const template = require('./dialog-confirm.html');

@Component({
    template,
    selector: 'dialog-confirm'
})
export class DialogConfirmComponent {
    private title: string = 'Confirm';
    private message: string = 'Are you sure?';
    private yes: string = 'Yes';
    private no: string = 'No';

    constructor(private dialogRef: MdDialogRef<any>) {
    }

    confirm() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close();
    }
}
