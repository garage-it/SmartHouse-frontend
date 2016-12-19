import { Component, Input } from '@angular/core';
import { DashboardSubviewDto } from '../../core/views/dashboard-subview.dto';

@Component({
    selector: 'sh-dashboard-subview',
    templateUrl: './dashboard-subview.template.html',
    styleUrls: [ './dashboard-subview.style.scss' ]
})

export class DashboardSubviewComponent {
    @Input() dasboardSubview: DashboardSubviewDto;
}
