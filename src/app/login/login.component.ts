import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'sm-login',
    styles: [require('./login.component.scss')],
    template: require('./login.component.html')
})
export class LoginComponent {
    private credentials: Object = {};
    private loggingError: boolean = false;

    constructor(private auth: AuthService, private router: Router) {
        this.auth = auth;
        this.router = router;
    }

    login() {
        this.auth.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, err => {
                console.error(err.status);
                this.loggingError = true;
            });
    }
}
