import {ServoGauge, GAUGE_COEFFICIENT} from './servo-gauge.component';

describe('ServoGauge', () => {
    let sut;
    const nativeElement = {
        style: {}
    };
    const props = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

    beforeEach(() => {
        sut = new ServoGauge();
        sut.gaugeData = Object.assign({}, {nativeElement});
        sut.gaugeNeedle = Object.assign({}, {nativeElement});
        spyOn(sut, 'setDegree').and.callThrough();
    });
    describe('on changes', () => {
        it('should set all required props', () => {
            sut.degree = 42;
            sut.ngOnChanges();
            expect(sut.setDegree.calls.count()).toEqual(props.length);
        });

        it('should set proper styles', () => {
            sut.degree = 42;
            sut.ngOnChanges();
            const turns = sut.computeTurns(sut.degree / 100 * GAUGE_COEFFICIENT);
            for (const prop of props) {
                expect(sut.gaugeData.nativeElement.style[prop]).toEqual(`rotate(${turns}turn)`);
                expect(sut.gaugeNeedle.nativeElement.style[prop]).toEqual(`rotate(${turns}turn)`);
            }
        });
    });
});
