import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

const data = [
    { value: 'value1' },
    { value: 'value2' },
    { value: 'value3' }
];

@Injectable()
export class ListService {
    getObservableData() {
        return Observable.create(observer => {
            observer.next(data);
            observer.complete();
        });
    }

    getPromisedData() {
        return Promise.resolve(data);
    }
}
