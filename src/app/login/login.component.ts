import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { IUserCredentials } from '../shared/auth/auth.interfaces';

@Component({
    selector: 'sm-login',
    styles: [require('./login.component.scss')],
    template: require('./login.component.html')
})
export class LoginComponent {
    private credentials: IUserCredentials = {
        email: null,
        password: null
    };
    private loggingError: boolean = false;

    constructor(private auth: AuthService, private router: Router) {}

    login() {
        this.auth.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, err => {
                this.loggingError = true;
            });
    }
}
