import { Component, Input } from '@angular/core';

@Component({
    selector: 'protected',
    template: require('./protected.template.html'),
})

export class ProtectedComponent {
    @Input('is-logged-in') isLoggedIn: boolean = false;
    @Input() roles: Array<string> = [];
}
