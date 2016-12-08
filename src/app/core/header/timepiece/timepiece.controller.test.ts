import { TimepieceComponent } from './timepiece.component';

describe('Timepiece', () => {
    let sut;
    let mockDueTime;
    let mockPeriod;

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

    });

    describe('On timer create', () => {

        beforeEach(() => {
            mockDueTime = 0;
            mockPeriod = 1000;
            sut.createTimer(mockDueTime, mockPeriod);
        });

        it('timer should be defined', () => {
            expect(sut.timer).toBeDefined();
        });

        it('timer period should be equal to passed value', () => {
            expect(sut.timer.period).toEqual(mockPeriod);
        });

        it('timer dueTime should be equal to passed value', () => {
            expect(sut.timer.dueTime).toEqual(mockDueTime);
        });

    });

    describe('On subscribe', () => {

        beforeEach(() => {
            mockDueTime = 0;
            mockPeriod = 1000;
            sut.createTimer(mockDueTime, mockPeriod);
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
            mockDueTime = 0;
            mockPeriod = 1000;
            sut.createTimer(mockDueTime, mockPeriod);
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
