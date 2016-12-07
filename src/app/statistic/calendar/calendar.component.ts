import { Component } from '@angular/core';

@Component({
    selector: 'sh-calendar',
    templateUrl: 'calendar.template.html',
    styleUrls: ['./calendar.styles.scss']
})
export class CalendarComponent {
    private myDateRangePickerOptions;

    constructor() {
        this.myDateRangePickerOptions = {
            clearBtnTxt: 'Clear',
            beginDateBtnTxt: 'Begin Date',
            endDateBtnTxt: 'End Date',
            acceptBtnTxt: 'OK',
            dateFormat: 'dd.mm.yyyy',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            selectionTxtFontSize: '15px',
            alignSelectorRight: true,
            indicateInvalidDateRange: true,
            showDateRangeFormatPlaceholder: false
        };
    }

    onDateRangeChanged($event) {
        console.log('$event', $event);
    }

}
