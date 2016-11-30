import { Component } from '@angular/core';
import { RolesService } from './roles.service';

@Component({
    selector: 'sh-roles',
    styleUrls: ['./roles.style.scss'],
    templateUrl: './roles.template.html'
})
export class RolesComponent {
    private users = [];

    constructor(private rolesService: RolesService) {}

    ngOnInit() {
        this.rolesService.retrieve().then(users => {
            this.users = users;
        });
    }
}
