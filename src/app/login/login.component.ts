import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'sm-login',
    styles: [require('./login.component.scss')],
    template: require('./login.component.html')
})
export class LoginComponent {
    constructor(private auth: AuthService, private router: Router) {
        this.auth = auth;
        this.router = router;
    }

    login(e, email, password) {
        e.preventDefault();

        this.auth.login({email, password})
            .subscribe(() => {
                this.router.navigate(['/']);
            }, err => {
                console.error(err);
            });
    }
}
