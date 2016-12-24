import { OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SensorWidgetService } from '../sensor-widget/sensor-widget.service';

export class BaseSensor implements OnInit, OnDestroy {

    protected data: {
        value: string|number|boolean|null,
        updateTime: Date|null
    };
    protected device: {
        mqttId: string,
        value: string|number|boolean|null,
        valueUpdated: string
    };

    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    constructor(protected sensorWidgetService: SensorWidgetService) {}

    ngOnInit() {
        this.data = {
            value: this.device.value || null,
            updateTime: this.device.valueUpdated ? new Date(this.device.valueUpdated) : null
        };
        this.sensorWidgetService
            .subscribe(this.device.mqttId, data => this.onDeviceDataChanged(data));
    }

    onDeviceDataChanged(data) {
        if (this.device.mqttId === data.device) {
            this.data = data;
            this.data.updateTime = new Date();
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