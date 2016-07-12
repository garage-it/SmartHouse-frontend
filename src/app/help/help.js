import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'sm-help',
    styles: [require('./help.scss')],
    template: require('./help.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class Help {}
