import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sh-device-widget',
    templateUrl: 'device-widget.template.html',
    styleUrls: ['device-widget.style.scss']
})
export class DeviceWidgetComponent {
    @Input() device;
    @Input() isEditMode: boolean = false;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    removeWidget(): void {
        this.onRemoveWidget.emit(this.device);
    }
}
