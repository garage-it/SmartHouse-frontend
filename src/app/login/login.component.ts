import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../core/auth/auth.service';
import { IUserCredentials } from '../core/auth/auth.interfaces';
import { WindowRef } from '../core/browser/window-ref.service';

const FB_LOGIN_URL_PATH = '/auth/login-facebook';
const FB_LOGIN_REDIRECT_PARAM = 'redirect_uri';
const FB_LOGIN_CALLBACK_NAV_URL = '/login/fb-callback';

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

    constructor(
        private auth: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private location: Location,
        private windowRef: WindowRef
    ) {

        this.activateRoute.params.subscribe((params: Params) => {
            this.fbLoggingError = (params['error'] === 'fb');
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
        this.windowRef.nativeWindow.location.href =
            `${FB_LOGIN_URL_PATH}?${FB_LOGIN_REDIRECT_PARAM}=` + encodeURIComponent(
                this.windowRef.nativeWindow.location.origin +
                this.location.prepareExternalUrl(FB_LOGIN_CALLBACK_NAV_URL)
            );
    }

    ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
