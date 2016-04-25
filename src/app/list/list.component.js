import {Component} from 'angular2/core';
import template from './list.html';

import {ListService} from './list.service';

@Component({
    selector: 'sm-list',
    template,
    providers: [ ListService ]
})
export class ListComponent {
    constructor(listService: ListService) {
        this._listService = listService;
    }

    ngOnInit() {
        console.log('Init List'); // eslint-disable-line

        this.asyncObservableList = this._listService.getObservableData();

        this.asyncObservableList.subscribe(data => {
            this.resolvedObservableList = data;
        });

        this.asyncPromiseList = this._listService.getPromisedData();

        this.asyncPromiseList.then(data => {
            this.resolvedPromiseList = data;
        });
    }
}
