import { ScenarioStatusService, SCENARIO_STATUS_CHANGE_EVENT } from './scenario-status.service';

const mockSocket = {
    on: jasmine.createSpy('on')
};

const mockSocketIo = {
    connect: () => mockSocket
};

describe('ScenarioStatusService', () => {
    let sut;

    beforeEach(() => {

        sut = new ScenarioStatusService();
        sut.io = mockSocketIo;

    });

    describe('subscribe', () => {
        let callback;
        let event;

        beforeEach(() => {
            callback = jasmine.createSpy('callback');
            event = {a: 1};
            sut.setup();
            sut.stream.subscribe(callback);
        });

        it('should subscribe to scenario status change event', () => {
            expect(mockSocket.on).toHaveBeenCalledWith(SCENARIO_STATUS_CHANGE_EVENT,
                jasmine.any(Function));
        });

        it('should execute callback on scenario status change', () => {
            const handler = mockSocket.on.calls.mostRecent().args[1];
            handler(event);
            expect(callback).toHaveBeenCalledWith(event);
        });
    });
});
