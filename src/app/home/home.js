import {Component} from 'angular2/core';

@Component({
    selector: 'sm-home',
    template: '<h1>Home</h1>'
})
export class Home {
    ngOnInit() {
        console.log('Init Home'); // eslint-disable-line
    }
}
