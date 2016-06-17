import SensorWidgetService from './sensor-widget.service';

export default class BaseSensor {
    sensorWidgetService: any;
    data: any;
    device: any;

    constructor() {
        this.sensorWidgetService = new SensorWidgetService();
    }

    ngOnInit() {
        this.data = {};

        this.sensorWidgetService
            .subscribe(this.device.mqttId, data => this.onDeviceDataChanged(data));
    }

    onDeviceDataChanged(data) {
        this.data = data;
    }

    ngOnDestroy() {
        this.sensorWidgetService
            .unsubscribe(this.device.mqttId);
    }
}
