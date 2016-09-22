import { SensorWidgetService } from '../sensor-widget/sensor-widget.service';

export class BaseSensor {
    constructor(sensorWidgetService: SensorWidgetService) {
        this.sensorWidgetService = sensorWidgetService;
    }

    ngOnInit() {
        this.data = {};

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
}
