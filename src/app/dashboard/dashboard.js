import {Component} from 'angular2/core';

@Component({
    selector: 'sm-dashboard',
    template: '<h1>Dashboard</h1>'
})
export class Dashboard {
    ngOnInit() {
        console.log('Init Dashboard'); // eslint-disable-line
    }
}
