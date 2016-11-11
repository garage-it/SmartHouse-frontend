import {async, TestBed} from '@angular/core/testing';

import { SensorExecutorWidgetComponent } from './sensor-executor-widget.component';
import { SensorWidgetService } from '../shared/sensor-widget/sensor-widget.service';
import { DEVICE_ON_STATE, DEVICE_OFF_STATE } from '../shared/base-output-sensor/base-output-sensor';


class SensorWidgetServiceMock {
    subscribe(device, callback) {
        return callback('test');
    }
    unsubscribe() {}

    pushEvent() {}
}

describe('Sensor-executor-widget', () => {
    let sut;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SensorExecutorWidgetComponent ],
            providers: [ {provide: SensorWidgetService, useClass: SensorWidgetServiceMock }]
        })
        .overrideComponent(SensorExecutorWidgetComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(SensorExecutorWidgetComponent).componentInstance;
            sut.data = {};
            sut.device = {
                mqttId: 'mock'
            };
            spyOn(sut, 'pushEvent').and.callThrough();
            spyOn(sut, 'fromDeviceRepresentation').and.callThrough();
        });
    }));

    describe('Switch executor', () => {
        it('should push command when executor change state', () => {
            const $eventMock = {
                target: {checked: true}
            };
            sut.switchExecutor($eventMock);
            expect(sut.pushEvent).toHaveBeenCalledWith(
                $eventMock.target.checked,
                DEVICE_ON_STATE,
                DEVICE_OFF_STATE
            );
        });

        describe('when receiving device related data', () => {
            beforeEach(() => {
                sut.onDeviceDataChanged({
                    value: 'ON',
                    device: sut.device.mqttId
                });
            });

            it('should convert data to SM format', () => {
                expect(sut.fromDeviceRepresentation).toHaveBeenCalledWith('ON');
            });

            it('should enable executor data when receive ON from device', () => {
                expect(sut.data.value).toEqual(true);
            });
        });
    });
});
