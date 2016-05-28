import SensorWidgetService from './sensor-widget.service';

export default class BaseSensor {
    constructor() {
        this.sensorWidgetService = new SensorWidgetService();
    }

    ngOnInit() {
        this.data = {};

        this.sensorWidgetService
            .subscribe(this.device.mqttId, data => {
                this.data = data;
            });
    }

    ngOnDestroy() {
        this.sensorWidgetService
            .unsubscribe(this.device.mqttId);
    }
}
