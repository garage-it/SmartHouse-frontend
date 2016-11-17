import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { IUserRegistrationData } from '../core/auth/auth.interfaces';
import { AuthService } from '../core/auth/auth.service';

const style = require('./registration.style.scss');
const template = require('./registration.template.html');

@Component({
    template,
    styles: [style],
    selector: 'sh-registration'
})
export class RegistrationComponent {
    private registrationSubscription: Subscription;
    private error: string = '';
    private user: IUserRegistrationData = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    save() {
        this.registrationSubscription = this.authService.register(this.user)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, err => {
                this.error = err.json().error || 'Unable to register';
            });
    }

    passwordsMatch() {
        return this.user.password === this.user.passwordConfirm;
    }

    ngOnDestroy() {
        if (this.registrationSubscription) {
            this.registrationSubscription.unsubscribe();
        }
    }
}
