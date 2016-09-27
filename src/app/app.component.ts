import { Component, ViewEncapsulation } from '@angular/core';

const style = require('./app.style.scss');
const template = require('./app.template.html');

@Component({
    selector: 'sh-app',
    styles: [style],
    template,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {}
