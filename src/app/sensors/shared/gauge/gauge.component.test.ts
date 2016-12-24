import { GaugeComponent, GAUGE_COEFFICIENT } from './gauge.component';

describe('Gauge', () => {
    let sut;
    const props = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

    beforeEach(() => {
        sut = new GaugeComponent();
    });

    describe('on changes', () => {
        beforeEach(() => {
            sut.gaugeData = {
                nativeElement: {
                    style: {}
                }
            };
            sut.gaugeNeedle = {
                nativeElement: {
                    style: {}
                }
            };
            spyOn(sut, 'setDegree').and.callThrough();
        });

        it('should set all required props', () => {
            sut.degree = 42;
            sut.ngOnChanges();

            expect(sut.setDegree.calls.count()).toEqual(props.length);
        });

        it('should set proper styles', () => {
            sut.degree = 42;
            sut.ngOnChanges();
            const turns = GaugeComponent.computeTurns(sut.degree / 100 * GAUGE_COEFFICIENT);
            for (const prop of props) {
                expect(sut.gaugeData.nativeElement.style[prop]).toEqual(`rotate(${turns}turn)`);
                expect(sut.gaugeNeedle.nativeElement.style[prop]).toEqual(`rotate(${turns}turn)`);
            }
        });
    });
});
