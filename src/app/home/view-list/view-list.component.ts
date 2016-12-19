import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewDto } from '../view.dto';

@Component({
    selector: 'sh-view-list',
    templateUrl: 'view-list.template.html',
    styleUrls: [ 'view-list.style.scss' ]
})
export class ViewListComponent {
    @Input() listViews: Array<ViewDto> = [];
    @Output() onSelectView: EventEmitter<any> = new EventEmitter();

    selectView(view: ViewDto): void {
        this.onSelectView.emit(view);
    }
}
