import { TimepieceComponent } from './timepiece.component';

describe('Timepiece', () => {
    let sut;

    beforeEach(() => {
        sut = new TimepieceComponent();
    });

    describe('On Init', () => {

        beforeEach(() => {
            spyOn(sut, 'createTimer');
            spyOn(sut, 'subscribeToTimer');
            sut.ngOnInit();
        });

        it('should create the timer', () => {
            expect(sut.createTimer).toHaveBeenCalled();
        });

        it('should subscribe to timer', () => {
            expect(sut.subscribeToTimer).toHaveBeenCalled();
        });

        it('timer should be undefined', () => {
            expect(sut.timer).toBeUndefined();
        });

        it('timeTracker should be undefined', () => {
            expect(sut.timeTracker).toBeUndefined();
        });

    });

    describe('On timer create', () => {

        beforeEach(() => {
            sut.createTimer(0, 1000);
        });

        it('timer should be defined', () => {
            expect(sut.timer).toBeDefined();
        });

        it('timer period should be 1000 ms', () => {
            expect(sut.timer.period).toEqual(1000);
        });

        it('timer dueTime should be 0 ms', () => {
            expect(sut.timer.dueTime).toEqual(0);
        });

    });

    describe('On subscribe', () => {

        beforeEach(() => {
            sut.createTimer(0, 1000);
            sut.subscribeToTimer();
        });

        it('timeTracker should be defined', () => {
            expect(sut.timeTracker).toBeDefined();
        });

        it('timeTracker should not be closed', () => {
            expect(sut.timeTracker.closed).toEqual(false);
        });

        it('timeTracker should not be stopped', () => {
            expect(sut.timeTracker.isStopped).toEqual(false);
        });

    });

    describe('On Destroy', () => {

        beforeEach(() => {
            spyOn(sut, 'unsubscribeFromTimer');
            sut.ngOnDestroy();
        });

        it('should unsubscribe from timer', () => {
            expect(sut.unsubscribeFromTimer).toHaveBeenCalled();
        });

    });

    describe('On unsubscribe', () => {

        beforeEach(() => {
            sut.createTimer(0, 1000);
            sut.subscribeToTimer();
            sut.unsubscribeFromTimer();
        });

        it('timeTracker should be defined', () => {
            expect(sut.timeTracker).toBeDefined();
        });

        it('timeTracker should be closed', () => {
            expect(sut.timeTracker.closed).toEqual(true);
        });

        it('timeTracker should be stopped', () => {
            expect(sut.timeTracker.isStopped).toEqual(true);
        });

    });

});
