import {ViewChild, Component, OnChanges} from '@angular/core';

import template from './servo-gauge.html';
import styles from './servo-gauge.scss';

export const GAUGE_COEFFICIENT = 0.56;

@Component({
    selector: 'sm-servo-gauge',
    template,
    styles: [styles],
    inputs: ['degree']
})
export class ServoGauge implements OnChanges {

    @ViewChild('gaugeData') gaugeData;
    @ViewChild('gaugeNeedle') gaugeNeedle;

    props = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

    ngOnChanges() {
        for (const prop of this.props) {
            const degree = isNaN(this.degree) ? 0 : +this.degree / 100 * GAUGE_COEFFICIENT;
            this.setDegree(degree, prop);
        }
    }

    computeTurns(degree) {
        return -0.5 + (degree * 0.5);
    }

    setDegree(degree, prop) {
        const turns = this.computeTurns(degree);
        this.gaugeData.nativeElement.style[prop] = `rotate(${turns}turn)`;
        this.gaugeNeedle.nativeElement.style[prop] = `rotate(${turns}turn)`;
    }

}

