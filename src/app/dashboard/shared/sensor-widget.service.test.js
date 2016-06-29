import SensorWidgetService from './sensor-widget.service';

function mockSocketIo() {
    return {
        on: jasmine.createSpy(),
        emit: jasmine.createSpy(),
        connected: false
    };
}

describe('SensorWidgetService', () => {
    let sut;
    let device;

    beforeEach(() => {
        device = {};
        sut = new SensorWidgetService();
        sut.io = mockSocketIo;
        spyOn(sut, 'io').and.callThrough();
        spyOn(sut.socket, 'on').and.callThrough();
        spyOn(sut.socket, 'emit').and.callThrough();
    });

    describe('setup socket io', () => {
        beforeEach(() => {
            sut.setupSocket();
        });

        it('should setup socket io', () => {
            expect(sut.io).toHaveBeenCalledWith(ENV_PUBLIC_CONFIG.backEndWebSocketUrl);
        });
    });

    describe('subscribe', () => {
        let callback;

        beforeEach(() => {
            callback = jasmine.createSpy();
        });

        it('should subscribe on sensor connect if it is not connected', () => {
            sut.subscribe(device, callback);
            expect(sut.socket.on).toHaveBeenCalledWith('connect', jasmine.any(Function));
        });

        it('should NOT subscribe on sensor connect if it is connected', () => {
            sut.socket.connected = true;
            sut.subscribe(device, callback);
            expect(sut.socket.on).not.toHaveBeenCalledWith('connect', jasmine.any(Function));
        });

        it('should subscribe on sensor event when connection exists', () => {
            sut.subscribe(device, callback);
            sut.socket.on.calls.mostRecent().args[1]();
            expect(sut.socket.on).toHaveBeenCalledWith('event', callback);
            sut.socket.on.calls.mostRecent().args[1]();
            expect(callback).toHaveBeenCalled();
            expect(sut.socket.emit).toHaveBeenCalledWith('subscribe', {device});
        });

        it('should NOT subscribe on sensor event if there is no device', () => {
            sut.subscribe('', callback);
            sut.socket.on.calls.mostRecent().args[1]();
            sut.socket.on.calls.mostRecent().args[1]();
            expect(sut.socket.emit).not.toHaveBeenCalledWith('subscribe', {device});
        });
    });

    describe('unsubscribe', () => {
        beforeEach(() => {
            sut.unsubscribe(device);
        });

        it('should unsubscribe from sensor updates', () => {
            expect(sut.socket.emit).toHaveBeenCalledWith('unsubscribe', {device});
        });
    });
});
