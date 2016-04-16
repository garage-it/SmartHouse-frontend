import {SensorDetail} from './sensor-detail.component';
import Sensor from './sensor';

describe('sensor-detail module', () => {
    let sut;

    beforeEach(() => {

    });

    describe('init', () => {
        it('should create new sensor if id isn\'t passed to class', () => {
            sut = new SensorDetail();
            expect(sut.sensor).toBeDefined();
        });
        it('should get sensor by given id', () => {

        });
    })

});