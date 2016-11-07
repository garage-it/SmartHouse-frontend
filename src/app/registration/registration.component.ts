import { Component } from '@angular/core';

import { User } from '../shared/auth/user';

const style = require('./registration.style.scss');
const template = require('./registration.template.html');

@Component({
    template,
    styles: [style],
    selector: 'registration'
})
export class RegistrationComponent {
    private user: User;

    constructor() {
        this.user = new User();
    }

    save() {
        console.log(this.user);
    }

    passwordsMatch() {
        return this.user.password === this.user.passwordConfirm;
    }
}
