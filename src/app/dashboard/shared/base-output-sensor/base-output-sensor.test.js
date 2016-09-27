import { BaseOutputSensor, DEVICE_RESPOND_TIMEOUT } from './base-output-sensor';

describe('base-output-sensor', () => {
    let sut;
    let sensorWidgetService;
    let pending;

    beforeEach(() => {
        sensorWidgetService = {
            pushEvent: jasmine.createSpy()
        };
        sut = new BaseOutputSensor();
        sut.data = {};
        sut.sensorWidgetService = sensorWidgetService;

        for (const symbol of Object.getOwnPropertySymbols(sut)) {
            if (symbol.toString().search(/pending/)) {
                pending = symbol;
            }
        }
    });
    describe('when instantiated', () => {
        it('should not be in pending state', () => {
            expect(sut[pending]).toEqual(null);
        });
    });

    describe('when event was pushed', () => {
        const mockDeviceMqttId = 'mock';
        const condition = true;
        const positiveValue = 1;
        const negativeValue = 0;
        const self = undefined;
        const args = undefined;
        const passedData = {
            device: mockDeviceMqttId,
            value: true
        };

        beforeEach(() => {
            sut.device = {mqttId: mockDeviceMqttId};
        });
        describe('pass data to sensor', () => {
            beforeEach(() => {
                spyOn(sut, 'generateValue').and.callThrough();
                spyOn(sut, 'toDeviceRepresentation').and.callFake(value => !!value);
                sut.pushEvent({condition, positiveValue, negativeValue});
            });

            it('should pass it to sensor', () => {
                expect(sensorWidgetService.pushEvent).toHaveBeenCalledWith(passedData);
            });

            it('should generate value', () => {
                expect(sut.generateValue)
                    .toHaveBeenCalledWith({condition, self, args, positiveValue, negativeValue});
            });

            it('should change state', () => {
                expect(sut.data.value).toEqual(positiveValue);
            });

            describe('value conversation', () => {
                it('should convert data to device`s format', () => {
                    expect(sut.toDeviceRepresentation).toHaveBeenCalledWith(1);
                });
            });
        });

        describe('pass data depending on condition', () => {
            describe('simple primitive condition', () => {
                beforeEach(() => {
                    sut.pushEvent({condition: false, positiveValue, negativeValue});
                });
                it('should choose second(negative) option', () => {
                    expect(sensorWidgetService.pushEvent).toHaveBeenCalledWith({
                        device: mockDeviceMqttId,
                        value: negativeValue
                    });
                });
            });
            describe('complex condition', () => {
                beforeEach(() => {
                    sut.pushEvent({condition: () => true, positiveValue, negativeValue});
                });
                it('should choose first(positive) option', () => {
                    expect(sensorWidgetService.pushEvent).toHaveBeenCalledWith({
                        device: mockDeviceMqttId,
                        value: positiveValue
                    });
                });
            });
        });

        describe('await response', () => {
            it('should not change value until delay ends', fakeAsync(() => {
                sut.pushEvent({condition, positiveValue, negativeValue});
                expect(sut[pending]).toEqual(true);
                tick(DEVICE_RESPOND_TIMEOUT + 1000);
                expect(sut[pending]).toEqual(null);
            }));
        });
    });

    describe('when device data are changed', () => {
        const valueInInternalDeviceFormat = '100';
        const convertedValue = 100;
        const positiveValue = valueInInternalDeviceFormat;
        const negativeValue = null;
        const data = {
            value: valueInInternalDeviceFormat
        };

        describe('without data conversation', () => {
            beforeEach(() => {
                spyOn(sut, 'fromDeviceRepresentation').and.callThrough();
            });

            it('should return value "as is"', () => {
                sut[pending] = null;
                sut.onDeviceDataChanged(data);
                expect(sut.fromDeviceRepresentation)
                    .toHaveBeenCalledWith(data.value);
                expect(sut.data.value).toEqual(data.value);
            });
        });

        describe('with data conversation', () => {
            beforeEach(() => {
                spyOn(sut, 'generateValue').and.callThrough();
                spyOn(sut, 'fromDeviceRepresentation').and.callFake(value => +value);
            });
            it('should drop data if still pending', () => {
                sut[pending] = true;
                sut.onDeviceDataChanged(data);
                expect(sut.generateValue.calls.any()).toEqual(false);
            });
            it('should convert data from device`s format using function', () => {
                sut[pending] = null;
                sut.onDeviceDataChanged(data);
                expect(sut.fromDeviceRepresentation)
                    .toHaveBeenCalledWith(data.value);
                expect(sut.generateValue)
                    .toHaveBeenCalledWith({condition: true, positiveValue, negativeValue});
            });
            it('should convert data from device`s format', () => {
                sut[pending] = null;
                sut.onDeviceDataChanged(data);
                expect(sut.data.value).toEqual(convertedValue);
            });
        });
    });
});
