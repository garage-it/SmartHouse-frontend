import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { RolesService } from './roles.service';

@Component({
    selector: 'sh-roles',
    styleUrls: ['./roles.style.scss'],
    templateUrl: './roles.template.html'
})
export class RolesComponent {
    private subscription: Subscription;
    private users = [];

    constructor(private rolesService: RolesService) {}

    ngOnInit() {
        this.subscription = this.rolesService.retrieve().subscribe(users => {
            this.users = users.responses;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
