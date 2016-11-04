import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
const template = require('./dialog-confirm.html');

@Component({
    template,
    selector: 'dialog-confirm'
})
export class DialogConfirmComponent {
    public title: string = 'Confirm';
    public message: string = 'Are you sure?';
    public yes: string = 'Yes';
    public no: string = 'No';

    constructor(private dialogRef: MdDialogRef<any>) {
    }

    confirm() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close();
    }
}
