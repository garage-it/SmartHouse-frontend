import { ViewChild, Component, OnChanges, Input } from '@angular/core';

export const GAUGE_COEFFICIENT = 0.56;

@Component({
    selector: 'sh-gauge',
    templateUrl: './gauge.template.html',
    styleUrls: ['./gauge.style.scss']
})
export class GaugeComponent implements OnChanges {

    @Input() degree;

    @ViewChild('gaugeData') gaugeData;
    @ViewChild('gaugeNeedle') gaugeNeedle;

    props = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

    static computeTurns(degree) {
        return -0.5 + (degree * 0.5);
    }

    ngOnChanges() {
        for (const prop of this.props) {
            const degree = isNaN(this.degree) ? 0 : +this.degree / 100 * GAUGE_COEFFICIENT;
            this.setDegree(degree, prop);
        }
    }

    setDegree(degree, prop) {
        const turns = GaugeComponent.computeTurns(degree);
        this.gaugeData.nativeElement.style[prop] = `rotate(${turns}turn)`;
        this.gaugeNeedle.nativeElement.style[prop] = `rotate(${turns}turn)`;
    }

}

