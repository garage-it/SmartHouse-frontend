import { SensorsListComponent } from './sensors-list.component';

describe('SensorsList', () => {
    let sut;
    let ActivatedRoute;

    const device1 = {_id: '123'};
    const device2 = {_id: '345'};
    const mockSensors = [device1, device2];

    beforeEach(() => {
        ActivatedRoute = {
            snapshot: {
                data: {
                    sensors: mockSensors
                }
            }
        };
        sut = new SensorsListComponent(ActivatedRoute);
        sut.onAddSensor.emit = jasmine.createSpy('emitAdd');
        sut.onRemoveSensor.emit = jasmine.createSpy('emitRemove');
    });

    it('should set resolved devices to scope', () => {
        sut.ngOnInit();
        expect(sut.devices).toEqual(mockSensors);
    });

    it('should emit added sensor when sensor is added', () => {
        const sensor = Symbol('Sensor');
        sut.addSensor(sensor);
        expect(sut.onAddSensor.emit).toHaveBeenCalledWith(sensor);
    });

    it('should emit removed sensor when sensor is removed', () => {
        const sensor = Symbol('Sensor');
        sut.removeSensor(sensor);
        expect(sut.onRemoveSensor.emit).toHaveBeenCalledWith(sensor);
    });

    describe('is device already selected', () => {
        beforeEach(() => {
            sut.mappedSensors = mockSensors;
        });

        it('should highlight toggler when item is already selected', () => {
            expect(sut.isSensorOnView(device2)).toEqual(true);
        });

        it('should not highlight toggler when item is not selected yet', () => {
            const device3 = {_id: '777'};
            expect(sut.isSensorOnView(device3)).toEqual(false);
        });
    });
});
