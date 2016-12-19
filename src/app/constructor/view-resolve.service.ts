import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HomeService } from '../home/home.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewInfoDto } from '../home/view/view.dto';

@Injectable()
export class ViewResolveService implements Resolve<ViewInfoDto> {

    constructor(private homeService: HomeService,
                private toastr: ToastsManager) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        const viewId = route.params['id'];
        return this.homeService.getView(viewId)
            .catch(errorMessage => {
                this.toastr.error(errorMessage);

                return Observable.never();
            });
    }
}
