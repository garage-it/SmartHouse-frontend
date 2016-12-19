import { Component } from '@angular/core';
import { ViewInfoDto } from '../home/view.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-constructor',
    templateUrl: './constructor.template.html',
    styleUrls: ['./constructor.style.scss']
})
export class ConstructorComponent {
    public canBeMapActive: boolean = true;
    public canBeDashboardActive: boolean = true;
    private view: ViewInfoDto;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.view = this.route.snapshot.data['view'] || {
                name: '',
                description: '',
                defaultSubview: ''
            };
    }

    public onMapActiveChanged(value: boolean) {
        this.canBeDashboardActive = !value;
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = !value;
    }

    public onSaveView(): void {
        console.log('I want to be saved', this.view);
    }
}
