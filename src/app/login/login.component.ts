import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../core/auth/auth.service';
import { IUserCredentials } from '../core/auth/auth.interfaces';
import { WindowRef } from '../core/browser/window-ref.service';

@Component({
    selector: 'sh-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
    public credentials: IUserCredentials = {
        email: null,
        password: null
    };
    public loggingError: boolean = false;
    public fbLoggingError: boolean = false;
    private loginSubscription: Subscription;
    private fbLoginUrl: string = '/auth/login-facebook';

    constructor(
        private auth: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private windowRef: WindowRef) {

        this.activateRoute.params.subscribe((params: Params) => {
            this.fbLoggingError = (params['error'] === 'fb-error');
        });
    }

    login() {
        this.loginSubscription = this.auth.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, () => {
                this.loggingError = true;
            });
    }

    loginFb() {
        this.windowRef.nativeWindow.location.href = this.fbLoginUrl;
    }

    ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
