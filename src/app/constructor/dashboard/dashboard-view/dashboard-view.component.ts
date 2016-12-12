import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardConstructorService } from '../dashboard-constructor.service';
import { Device } from '../../../shared/devices/device.model';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: ['./dashboard-view.style.scss']
})
export class DashboardViewComponent {
    @Input() widgets: Device[] = [];
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router,
                private dashboardConstructorService: DashboardConstructorService) {
    }

    removeWidget(widget): void {
        this.onRemoveWidget.emit(widget);
    }

    save(): void {
        this.dashboardConstructorService.saveDashboard(this.widgets)
            .subscribe(() => this.router.navigate(['/']));
    }
}
