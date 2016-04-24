import {Component} from 'angular2/core';
import template from './home.html';

const selector = 'sm-home';
@Component({
    selector,
    template
})
export class Home {
    ngOnInit() {
        console.log('Init Home'); // eslint-disable-line
    }
}
