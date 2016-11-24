import { OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SensorWidgetService } from '../sensor-widget/sensor-widget.service';

export class BaseSensor implements OnInit, OnDestroy {

    protected data: {
        value: string|number|boolean|null
    };
    protected device: {
        mqttId: string
    };

    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(protected sensorWidgetService: SensorWidgetService) {}

    ngOnInit() {
        this.data = {value: null};
        this.sensorWidgetService
            .subscribe(this.device.mqttId, data => this.onDeviceDataChanged(data));
    }

    onDeviceDataChanged(data) {
        if (this.device.mqttId === data.device) {
            this.data = data;
        }
    }

    ngOnDestroy() {
        this.sensorWidgetService
            .unsubscribe(this.device.mqttId);
    }

    removeWidget() {
        this.onRemoveWidget.emit();
    }
}
