import { SensorDetailService } from './sensor-detail.service';

describe('SensorDetailService', () => {
    let sut;
    let http;

    const idMock = 'mock';
    const sensorMock = {_id: idMock};

    beforeEach(() => {
        http = {
            get: jasmine.createSpy('get'),
            post: jasmine.createSpy('post'),
            put: jasmine.createSpy('put'),
            delete: jasmine.createSpy('delete')
        };
        sut = new SensorDetailService(http);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        sut.get(sensorMock._id);
        expect(http.get).toHaveBeenCalledWith(`/sensors/${idMock}`);
    });

    it('should save sensor', () => {
        sut.save(sensorMock);
        expect(http.post).toHaveBeenCalledWith('/sensors', sensorMock);
    });

    it('should update sensor', () => {
        sut.update(sensorMock);
        expect(http.put).toHaveBeenCalledWith(`/sensors/${sensorMock._id}`, sensorMock);
    });

    it('should delete sensor', () => {
        sut.delete(sensorMock);
        expect(http.delete).toHaveBeenCalledWith(`/sensors/${sensorMock._id}`);
    });
});
