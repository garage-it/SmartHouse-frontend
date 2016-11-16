import { Component, Input } from '@angular/core';

@Component({
    selector: 'protected',
    template: require('./protected.template.html'),
})

export class ProtectedComponent {
    @Input() isLoggedIn: boolean = false;
    @Input() roles: Array<string> = [];
}
