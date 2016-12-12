import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HomeService } from './home.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class HomeResolveService {

    constructor(private homeService: HomeService, private toastr: ToastsManager) {}

    resolve() {
        return this.homeService.getMapList()
            .catch(errorMessage => {
                this.toastr.error(errorMessage);

                return Observable.never();
            });
    }
}
