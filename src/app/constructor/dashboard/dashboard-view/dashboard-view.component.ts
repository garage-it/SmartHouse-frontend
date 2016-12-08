import { Component, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { Router } from '@angular/router';
import { DashboardConstructorService } from '../dashboard-constructor.service';
import { Device } from '../../../devices/device.model';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: ['./dashboard-view.style.scss']
})
export class DashboardViewComponent {
    @Input() widgets: Device[] = [];
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private router: Router,
                private dashboardConstructorService: DashboardConstructorService) {
    }

    removeWidget(widget): void {
        this.onRemoveWidget.emit(widget);
    }

    cancel(): void {
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

    save(): void {
        this.dashboardConstructorService.saveDashboard(this.widgets)
            .subscribe(() => this.router.navigate(['/']));
    }
}
