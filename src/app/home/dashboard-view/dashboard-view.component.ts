import { Component, Input } from '@angular/core';
import { DashboardViewInfoDto } from './dashboard-view.dto';

@Component({
    selector: 'sh-dashboard-view',
    templateUrl: './dashboard-view.template.html',
    styleUrls: [ './dashboard-view.style.scss' ]
})

export class DashboardViewComponent {
    @Input() currentDasboardView: DashboardViewInfoDto;
}
