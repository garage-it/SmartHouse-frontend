import { Component } from '@angular/core';

const style = require('./home.style.scss');
const template = require('./home.template.html');

@Component({
    selector: 'sh-home',
    template,
    styles: [style]
})
export class HomeComponent {
    public createView() {

    }
}
