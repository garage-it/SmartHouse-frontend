import { Component } from '@angular/core';

const style = require('./main.component.scss');
const template = require('./main.component.html');

const MAIN_COMPONENT_SELECTOR = 'sh-main';

@Component({
    selector: MAIN_COMPONENT_SELECTOR,
    styles: [style],
    template
})
export class MainComponent {}
