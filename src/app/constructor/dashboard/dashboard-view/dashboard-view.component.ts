import { Component, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Widget } from '../../../dashboard/widget.model';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: ['./dashboard-view.style.scss']
})
export class DashboardViewComponent {
    @Input() widgets: Widget[];
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private router: Router) {
    }

    removeWidget(widget) {
        this.onRemoveWidget.emit(widget);
    }

    cancel() {
        const confirmOptions = {
            title: '',
            message: 'Do you want to exit without saving?',
            ok: 'Yes',
            cancel: 'No'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }
}
