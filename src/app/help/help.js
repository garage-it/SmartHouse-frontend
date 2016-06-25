import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'sm-help',
    styles: [require('./help.scss')],
    template: require('./help.html'),
    directives: [RouterLink]
})

export class Help {}
