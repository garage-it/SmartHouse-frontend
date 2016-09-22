import {async, TestBed} from '@angular/core/testing';

import { GaugeComponent, GAUGE_COEFFICIENT } from './gauge.component';

describe('Gauge', () => {
    let sut;
    const nativeElement = {
        style: {}
    };
    const props = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GaugeComponent ]
        })
        .overrideComponent(GaugeComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(GaugeComponent).componentInstance;
            sut.gaugeData = Object.assign({}, {nativeElement});
            sut.gaugeNeedle = Object.assign({}, {nativeElement});
            spyOn(sut, 'setDegree').and.callThrough();
        });
    }));
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
