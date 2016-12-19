import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HomeService } from '../home/home.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// TODO: Refactor with subview
// import { ViewInfoDto } from '../home/view.dto';

@Injectable()
// TODO: Refactor with subview
// export class ViewResolveService implements Resolve<ViewInfoDto> {
export class ViewResolveService implements Resolve<any> {

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
