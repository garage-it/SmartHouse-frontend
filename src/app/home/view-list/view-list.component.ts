import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapViewInfoDto } from '../../shared/view/map-view.dto';
import { DashboardViewInfoDto } from '../../shared/view/dashboard-view.dto';

@Component({
    selector: 'sh-view-list',
    templateUrl: 'view-list.template.html',
    styleUrls: [ 'view-list.style.scss' ]
})
export class ViewListComponent {
    @Input() listViews: Array<DashboardViewInfoDto | MapViewInfoDto> = [];
    @Input() currentView: DashboardViewInfoDto | MapViewInfoDto;
    @Output() onSelectView: EventEmitter<any> = new EventEmitter();

    viewMap(view: MapViewInfoDto): void {
        this.onSelectView.emit(view);
    }
}
