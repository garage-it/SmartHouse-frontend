import { TimepieceComponent } from './timepiece.component';

describe('Timepiece', () => {
    let sut;

    beforeEach(() => {
        sut = new TimepieceComponent();
    });

    describe('Date formatting', () => {

        beforeEach(() => {});

        it('should format Date', () => {
            const date = new Date('Tue Nov 29 2016 02:13:02 GMT+0200 (FLE Standard Time)');
            expect(sut.dateFormatter(date)).toEqual('11.29.2016 2:13');
        });

        it('should format Date', () => {
            const date = new Date(2016, 10, 5, 10, 10);
            expect(sut.dateFormatter(date)).toEqual('11.5.2016 10:10');
        });

        it('should format Date', () => {
            const date = new Date(1480383147676);
            expect(sut.dateFormatter(date)).toEqual('11.29.2016 3:32');
        });

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

    describe('On Destroy', () => {
        beforeEach(() => {
            spyOn(sut, 'unsubscribeFromTimer');
            sut.ngOnDestroy();
        });

        it('should unsubscribe from timer', () => {
            expect(sut.unsubscribeFromTimer).toHaveBeenCalled();
        });

    });

    describe('On init', () => {

        it('should create a timer', () => {

        });

        it('should subscribe to timer', ()=> {

        });

    });

    describe('Date formatting', ()=> {

    });

    describe('On destroy', ()=> {
        it('should unsubscribe from timer', ()=> {

        });
    })

});
