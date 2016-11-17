import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../core/auth/auth.service';
import { IUserCredentials } from '../core/auth/auth.interfaces';

const styles = require('./login.component.scss');
const template = require('./login.component.html');

@Component({
    selector: 'sh-login',
    styles: [styles],
    template
})
export class LoginComponent implements OnDestroy {
    public credentials: IUserCredentials = {
        email: null,
        password: null
    };
    public loggingError: boolean = false;
    private loginSubscription: Subscription;

    constructor(private auth: AuthService, private router: Router) {}

    login() {
        this.loginSubscription = this.auth.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, () => {
                this.loggingError = true;
            });
    }

    ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
