import { Component, Input } from '@angular/core';
import { MapViewInfoDto } from '../map-view/map-view.dto';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: [ './dashboard-view.style.scss' ]
})

export class DashboardViewComponent {
    @Input() currentView: MapViewInfoDto;
}
