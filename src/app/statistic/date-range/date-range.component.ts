import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'sh-calendar',
    templateUrl: 'date-range.template.html',
    styleUrls: ['date-range.styles.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent {
    startDate: Date;
    endDate: Date;
    @Output() rangeChanged = new EventEmitter();
    constructor() {
        // TODO: These should be passed to component by some ngModel
        this.startDate = new Date();
        this.endDate = new Date();
        this.startDate.setDate(this.startDate.getDate() - 3);
    }

    startDateChanged() {
        this.emitRangeChangd();
    }

    endDateChanged() {
        this.emitRangeChangd();
    }

    private emitRangeChangd() {
        this.rangeChanged.emit({
            startDate: this.startDate,
            endDate: this.endDate
        });
    }
}
