import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'sh-app',
    styleUrls: ['./app.style.scss'],
    templateUrl: './app.template.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}
