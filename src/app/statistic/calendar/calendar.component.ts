import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sh-calendar',
    templateUrl: 'calendar.template.html',
    styleUrls: ['./calendar.styles.scss']
})
export class CalendarComponent {
    @Output() dateChanged = new EventEmitter();
    valueChanged(value) {
        console.log(value);
        this.dateChanged.emit({value});
    }
}
