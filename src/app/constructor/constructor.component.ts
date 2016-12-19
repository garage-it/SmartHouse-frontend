import { Component } from '@angular/core';
import { ViewInfoDto } from '../home/view.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-constructor',
    templateUrl: './constructor.template.html'
})
export class ConstructorComponent {
    public canBeMapActive: boolean = true;
    public canBeDashboardActive: boolean = true;
    public default: string;
    public view: ViewInfoDto;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.view = this.route.snapshot.data['view'];
    }

    public onMapActiveChanged(value: boolean) {
        this.canBeDashboardActive = !value;
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = !value;
    }

    public onDashboardDefaultChange(value: string) {
        this.default = value;
    }

    public onMapDefaultChange(value: string) {
        this.default = value;
    }

    public onSaveView(): void {}
}
