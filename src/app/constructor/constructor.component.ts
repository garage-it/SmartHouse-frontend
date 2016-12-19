import { Component } from '@angular/core';
import { ViewInfoDto } from '../home/view/view.dto';
import { ActivatedRoute } from '@angular/router';
import { ViewService } from '../home/view/view.service';

@Component({
    selector: 'sh-constructor',
    templateUrl: './constructor.template.html',
    styleUrls: ['./constructor.style.scss']
})
export class ConstructorComponent {
    public canBeMapActive: boolean = true;
    public canBeDashboardActive: boolean = true;
    private view: ViewInfoDto;

    constructor(private route: ActivatedRoute, private viewService: ViewService) {}

    public ngOnInit(): void {
        this.view = this.route.snapshot.data['view'] || {
                name: '',
                description: '',
                defaultSubview: 'mapSubview',
                dashboardSubview: {},
                mapSubview: {}
            };
    }

    public onMapActiveChanged(value: boolean) {
        this.canBeDashboardActive = !value;
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = !value;
    }

    public onSaveView(): void {
        this.viewService.create(this.view).subscribe(view => {
            // TODO Save image??? and redirect
            console.log('view saved', view);
        });
    }
}
