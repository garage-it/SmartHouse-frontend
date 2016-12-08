import { SensorsListComponent } from './sensors-list.component';

describe('SensorsList', () => {
    let sut;

    beforeEach(() => {
        sut = new SensorsListComponent();
        sut.onAddSensor.emit = jasmine.createSpy('emit');
    });

    it('should emit add sensor event', () => {
        const sensor = Symbol('Sensor');
        sut.addSensor(sensor);
        expect(sut.onAddSensor.emit).toHaveBeenCalledWith(sensor);
    });
});
