import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { IUserCredentials } from '../core/auth/auth.interfaces';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'sm-login',
    styles: [require('./login.component.scss')],
    template: require('./login.component.html')
})
export class LoginComponent implements OnDestroy {
    private credentials: IUserCredentials = {
        email: null,
        password: null
    };
    private loggingError: boolean = false;
    private loginSubscription: Subscription;

    constructor(private auth: AuthService, private router: Router) {}

    login() {
        this.loginSubscription = this.auth.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, err => {
                this.loggingError = true;
            });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
}
