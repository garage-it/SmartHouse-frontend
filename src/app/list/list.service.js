import {Injectable} from 'angular2/core';

@Injectable()
export class ListService {
    getData() {
        return Promise.resolve([{
            value: 'value1'
        }, {
            value: 'value2'
        }, {
            value: 'value3'
        }]);
    }
}
