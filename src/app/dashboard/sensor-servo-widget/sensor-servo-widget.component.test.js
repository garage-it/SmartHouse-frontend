import {async, TestBed} from '@angular/core/testing';

import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';
import { SensorServoWidgetComponent } from './sensor-servo-widget.component';

class SensorWidgetServiceMock {
    subscribe(device, callback) {
        this.device = device;
        return callback('test');
    }
    unsubscribe() {}

    pushEvent() {}
}

describe('Sensor-servo-widget', () => {
    let sut;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SensorServoWidgetComponent ],
            providers: [ {provide: SensorWidgetService, useClass: SensorWidgetServiceMock }]
        })
        .overrideComponent(SensorServoWidgetComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(SensorServoWidgetComponent).componentInstance;
            sut.data = {};
            sut.device = {
                mqttId: 'mock'
            };
            spyOn(sut, 'pushEvent').and.callThrough();
        });
    }));

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            sut.data.value = '42';
            sut.changeDegree();
            expect(sut.pushEvent).toHaveBeenCalledWith({
                condition: true,
                positiveValue: '42',
            });
        });
    });
});
