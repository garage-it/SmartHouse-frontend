import { CanDeactivate } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import { Observable } from 'rxjs';
import { DialogService } from '../shared/dialog/dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CanDeactivateConstructor implements CanDeactivate<ConstructorComponent> {

    constructor(private dialogService: DialogService) {
    }

    canDeactivate(): Observable<boolean> {
        return this.dialogService.confirm(null, {
            title: '',
            message: 'Do you want to exit without saving?',
            ok: 'Yes',
            cancel: 'No'
        });
    }
}
