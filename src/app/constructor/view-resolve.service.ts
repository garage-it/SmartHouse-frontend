import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ConstructorService } from './constructor.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewInfoDto } from '../shared/view/view.dto';

@Injectable()
export class ViewResolveService implements Resolve<ViewInfoDto> {

    constructor(private constructorService: ConstructorService,
                private toastr: ToastsManager) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        const viewId = route.params['id'];
        return this.constructorService.getView(viewId)
            .catch(errorMessage => {
                this.toastr.error(errorMessage);

                return Observable.never();
            });
    }
}
