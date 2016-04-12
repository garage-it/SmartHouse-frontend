import {Component} from 'angular2/core';
import {DeviceList} from '../components/device-list';

@Component({
    selector: 'sm-home',
    template: require('./home.html'),
    directives: [DeviceList]
})
export class Home {
    ngOnInit() {
        console.log('Init Home'); // eslint-disable-line
    }
    test() {
        console.log('Test Form Home');
    }
}
