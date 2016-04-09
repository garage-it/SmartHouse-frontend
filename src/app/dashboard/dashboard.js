import {Component} from 'angular2/core';

@Component({
    selector: 'sm-dashboard',
    template: require('./dashboard.html')
})
export class Dashboard {
    ngOnInit() {
        console.log('Init Dashboard'); // eslint-disable-line
    }
}
